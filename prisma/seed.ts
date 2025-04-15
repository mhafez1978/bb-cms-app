import { PrismaClient, Role, User_country, User_state } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function main() {
  const users = [
    {
      active: true,
      role: Role.SUPER_ADMIN,
      firstName: "Mohamed",
      lastName: "Hafez",
      fullName: "Mohamed Hafez",
      phone: "+1-555-1234",
      username: "mhafez",
      image:
        "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg",
      email: "alice@example.com",
      password: await bcrypt.hash("password", 10),
      addressLine1: "123 Main Street",
      city: "Boston",
      state: User_state.massachusetts, // Ensure this matches a valid User_state enum value from your Prisma schema
      zipcode: "02118",
      country: User_country.united_states,
      notes: "Initial super admin user",
    },
    {
      active: true,
      role: Role.USER,
      firstName: "Ehab",
      lastName: "Hafez",
      fullName: "Ehab Hafez",
      phone: "+1-555-5678",
      image:
        "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg",
      username: "ehafez",
      email: "bob@example.com",
      password: await bcrypt.hash("password", 10),
      addressLine1: "456 Elm Street",
      city: "Lowell",
      state: User_state.california, // Ensure this matches a valid User_state enum value from your Prisma schema
      zipcode: "01852",
      country: User_country.united_states,
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
