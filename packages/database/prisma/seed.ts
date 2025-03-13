import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("randompassword123", Number(process.env.GEN_SALT || 12));

  const users = [
    {
      email: "admin@example.com",
      name: "Admin User",
      password: hashedPassword,
    },
    {
      email: "user@example.com",
      name: "Regular User",
      password: hashedPassword,
    },
    {
      email: "john.doe@example.com",
      name: "John Doe",
      password: hashedPassword,
    },
    {
      email: "jane.doe@example.com",
      name: "Jane Doe",
      password: hashedPassword,
    },
    {
      email: "maria.garcia@example.com",
      name: "Maria Garcia",
      password: hashedPassword,
    },
    {
      email: "carlos.mendez@example.com",
      name: "Carlos Mendez",
      password: hashedPassword,
    },
    {
      email: "laura.rodriguez@example.com",
      name: "Laura Rodriguez",
      password: hashedPassword,
    },
    {
      email: "david.smith@example.com",
      name: "David Smith",
      password: hashedPassword,
    },
    {
      email: "susan.lee@example.com",
      name: "Susan Lee",
      password: hashedPassword,
    },
    {
      email: "michael.brown@example.com",
      name: "Michael Brown",
      password: hashedPassword,
    },
  ];  

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }
}

main()
  .catch((error) => {
    console.error("Error al generar semilla", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
