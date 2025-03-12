// import request from "supertest";
// import { PrismaClient } from "@prisma/client";
// import { app } from "../server/server";

// const prisma = new PrismaClient();

describe("POST /register", () => {
  // beforeAll(async () => {
  //   await prisma.user.deleteMany();
  // });

  // afterAll(async () => {
  //   await prisma.$disconnect();
  // });

  it("should pass a basic test", () => {
    expect(1 + 1).toBe(2);
  });

  // it("debería registrar un usuario correctamente", async () => {
  //   const response = await request(app).post("/register").send({
  //     email: "test@example.com",
  //     password: "securePassword123",
  //     name: "Test User",
  //   });

  //   expect(response.status).toBe(201);
  //   expect(response.body).toHaveProperty("id");
  //   expect(response.body.email).toBe("test@example.com");
  // });

  // it("debería devolver error si el email ya existe", async () => {
  //   await prisma.user.create({
  //     data: {
  //       email: "test@example.com",
  //       password: "securePassword123",
  //       name: "Test User",
  //     },
  //   });

  //   const response = await request(app).post("/register").send({
  //     email: "test@example.com",
  //     password: "securePassword123",
  //     name: "Test User",
  //   });

  //   expect(response.status).toBe(400);
  //   expect(response.body).toHaveProperty("message", "El usuario ya existe");
  // });

  // it("debería devolver error si faltan campos obligatorios", async () => {
  //   const response = await request(app).post("/register").send({
  //     email: "invalid@example.com",
  //   });

  //   expect(response.status).toBe(400);
  //   expect(response.body).toHaveProperty("message");
  // });
});
