// app/api/models/sync/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { exec } from "child_process";

export async function POST() {
  try {
    // Read the model drafts
    const draftsPath = path.resolve(process.cwd(), "model_drafts.txt");
    if (!fs.existsSync(draftsPath)) {
      return NextResponse.json({ message: "No model drafts found." });
    }
    const drafts = fs.readFileSync(draftsPath, "utf-8");

    // Append drafts to schema.prisma
    const schemaPath = path.resolve(process.cwd(), "prisma/schema.prisma");
    fs.appendFileSync(schemaPath, "\n" + drafts);

    // Run Prisma commands to update the database
    exec("npx prisma db push", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${stderr}`);
        return;
      }
      console.log(`Success: ${stdout}`);
    });

    // Clear the drafts file
    fs.writeFileSync(draftsPath, "");

    return NextResponse.json({
      message: "Database synchronized successfully.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Synchronization failed." },
      { status: 500 }
    );
  }
}
