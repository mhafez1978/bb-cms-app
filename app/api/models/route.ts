import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import prisma from "@/lib/prisma";

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

    //console.log("✅ Raw tables result:", tables);

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
      { error: "Unable to fetch tables" },
      { status: 500 }
    );
  }
}

// POST: Add a new model to schema.prisma and update the database
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { modelName, fields } = body;

    const capitalizedModelName =
      modelName.charAt(0).toUpperCase() + modelName.slice(1);

    const capitalizedFields = fields.map((field: any) => {
      const name = field.name.trim();
      const rawType = field.type.trim();

      // Detect relation or decorator-based types
      const [baseType, ...rest] = rawType.split(" ");
      const fixedType = /^[a-z]+$/.test(baseType)
        ? baseType.charAt(0).toUpperCase() + baseType.slice(1).toLowerCase()
        : baseType;

      const type = [fixedType, ...rest].join(" ");

      return { name, type };
    });

    const modelDefinition = `
model ${capitalizedModelName} {
${capitalizedFields.map((f: any) => `  ${f.name} ${f.type}`).join("\n")}
}
`;

    const schemaPath = path.resolve(process.cwd(), "prisma/schema.prisma");
    const schema = fs.readFileSync(schemaPath, "utf-8");

    const updatedSchema = schema + "\n" + modelDefinition;
    fs.writeFileSync(schemaPath, updatedSchema);

    const migrationName = `add_${capitalizedModelName.toLowerCase()}`;

    exec(
      `npx prisma migrate dev --name ${migrationName}`,
      { cwd: process.cwd() },
      () => {
        exec("npx prisma generate", { cwd: process.cwd() }, () => {
          exec(
            "npx prisma studio",
            { cwd: process.cwd() },
            (err, stdout, stderr) => {
              if (err) {
                console.error("❌ Prisma Studio failed:", stderr);
              } else {
                console.log("✅ Prisma Studio launched:", stdout);
              }
            }
          );
        });
      }
    );

    return NextResponse.json({
      message: `Model ${capitalizedModelName} added and database updated.`,
    });
  } catch (error) {
    console.error("❌ Error adding model:", error);
    return NextResponse.json({ error: "Unable to add model" }, { status: 500 });
  }
}
