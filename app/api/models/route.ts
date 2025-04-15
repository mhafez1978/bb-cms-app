import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { exec as execCallback } from "child_process";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Convert exec to Promise-based
const exec = promisify(execCallback);

// Define types for better type safety
interface InputField {
  name: string;
  type: string;
}

interface OutputField {
  name: string;
  type: string;
}

interface ModelRequest {
  modelName: string;
  fields: InputField[];
}

// GET: Retrieve all tables and their columns
export async function GET() {
  try {
    const tables = await prisma.$queryRaw<
      { TABLE_NAME: string | null; COLUMN_NAME: string | null }[]
    >`
      SELECT TABLE_NAME, COLUMN_NAME
      FROM information_schema.columns
      WHERE table_schema = DATABASE()
    `;

    const tableMap: Record<string, string[]> = {};

    for (const row of tables) {
      const tableName = row?.TABLE_NAME?.trim();
      const columnName = row?.COLUMN_NAME?.trim();

      if (!tableName || !columnName) continue;

      if (!tableMap[tableName]) {
        tableMap[tableName] = [];
      }

      tableMap[tableName].push(columnName);
    }

    return NextResponse.json({ tables: tableMap });
  } catch (error) {
    console.error("❌ Error fetching tables:", error);
    return NextResponse.json(
      { error: "Failed to fetch database tables", details: String(error) },
      { status: 500 }
    );
  }
}

// POST: Add a new model to schema.prisma and update the database
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || session.user.role !== "SUPER_ADMIN") {
    return NextResponse.json(
      { message: "you're not authorized..." },
      { status: 401 }
    );
  }

  try {
    // Parse and validate request body
    const body = await req.json();
    const { modelName, fields } = body as ModelRequest;

    // Validate required fields
    if (
      !modelName ||
      !fields ||
      !Array.isArray(fields) ||
      fields.length === 0
    ) {
      return NextResponse.json(
        { error: "Invalid request. Model name and fields are required" },
        { status: 400 }
      );
    }

    // Capitalize model name (PascalCase for Prisma models)
    const capitalizedModelName =
      modelName.charAt(0).toUpperCase() + modelName.slice(1);

    // Process fields
    const capitalizedFields = fields.map((field: InputField): OutputField => {
      const name = field.name.trim();
      const rawType = field.type.trim();

      // Detect relation or decorator-based types
      const [baseType, ...rest] = rawType.split(" ");
      const fixedType = /^[a-z]+$/.test(baseType)
        ? baseType.charAt(0).toUpperCase() + baseType.slice(1).toLowerCase()
        : baseType;

      return {
        name,
        type: [fixedType, ...rest].join(" "),
      };
    });

    // Generate model definition
    const modelDefinition = `
model ${capitalizedModelName} {
${capitalizedFields.map((f) => `  ${f.name} ${f.type}`).join("\n")}
}
`;

    // Read and update schema file
    const schemaPath = path.resolve(process.cwd(), "prisma/schema.prisma");

    if (!fs.existsSync(schemaPath)) {
      return NextResponse.json(
        { error: "Schema file not found" },
        { status: 500 }
      );
    }

    const schema = fs.readFileSync(schemaPath, "utf-8");
    const updatedSchema = schema + "\n" + modelDefinition;
    fs.writeFileSync(schemaPath, updatedSchema);

    // Run migrations
    const migrationName = `add_${capitalizedModelName.toLowerCase()}`;

    try {
      // Run migrations sequentially
      await exec(`npx prisma migrate dev --name ${migrationName}`, {
        cwd: process.cwd(),
      });
      await exec("npx prisma generate", { cwd: process.cwd() });

      console.log(`✅ Model ${capitalizedModelName} added successfully`);

      return NextResponse.json({
        message: `Model ${capitalizedModelName} added and database updated successfully.`,
        model: capitalizedModelName,
      });
    } catch (execError) {
      console.error("❌ Migration error:", execError);

      // Try to restore the original schema file
      fs.writeFileSync(schemaPath, schema);

      return NextResponse.json(
        {
          error: "Failed to update database schema",
          details: String(execError),
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("❌ Error adding model:", error);
    return NextResponse.json(
      { error: "Failed to process request", details: String(error) },
      { status: 500 }
    );
  }
}
