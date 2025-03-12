import request from "supertest";
import { PrismaClient } from "@prisma/client";
import { app } from "../server/server";

const prisma = new PrismaClient();

describe("POST /register", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("debería registrar un usuario correctamente", async () => {
    const response = await request(app).post("/api/users/register").send({
      email: "test@example.com",
      password: "securePassword123",
      name: "Test User",
    });

    expect(response.status).toBe(201);
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.email).toBe("test@example.com");
  });

  it("debería devolver error si el email ya existe y validar que solo exista un usuario con ese email", async () => {
    await request(app).post("/api/users/register").send({
      email: "test2@example.com",
      password: "securePassword123",
      name: "Test User2",
    });
    
    const response = await request(app).post("/api/users/register").send({
      email: "test2@example.com",
      password: "securePassword123",
      name: "Test User2",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "El correo ya se encunetra registrado.");
    expect(response.body).toHaveProperty("field", ["email"]);

    const userCount = await prisma.user.count({
      where: { email: "test@example.com" }
    });
  
    expect(userCount).toBe(1);
  });

  it("debería devolver error si faltan campos obligatorios", async () => {
    const response = await request(app).post("/api/users/register").send({
      email: "invalid@example.com",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("errors");
  });

  it("debería devolver error si un correo invalido se ingresa", async () => {
    const response = await request(app).post("/api/users/register").send({
      email: "invalidmail",
      password: "securePassword123",
      name: "Test User",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("errors", ["Debe ser un email válido"]);
  }) 
});
