import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function main() {
  const users = [
    {
      active: true,
      role: "ADMIN",
      firstName: "Mohamed",
      lastName: "Hafez",
      fullName: "Mohamed Hafez",
      phone: "+1-555-1234",
      username: "mhafez",
      email: "alice@example.com",
      password: await bcrypt.hash("password", 10),
      addressLine1: "123 Main Street",
      city: "Boston",
      state: "massachusetts",
      zipcode: "02118",
      country: "united_states",
      notes: "Initial admin user",
    },
    {
      active: true,
      role: "USER",
      firstName: "Ehab",
      lastName: "Hafez",
      fullName: "Ehab Hafez",
      phone: "+1-555-5678",
      username: "ehafez",
      email: "bob@example.com",
      password: await bcrypt.hash("password", 10),
      addressLine1: "456 Elm Street",
      city: "Lowell",
      state: "alabama",
      zipcode: "01852",
      country: "united_states",
      notes: "Standard user",
    },
  ];

  for (const u of users) {
    await prisma.user.create({ data: u });
  }
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
