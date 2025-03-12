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

  it("should register a user successfully", async () => {
    const response = await request(app).post("/api/users/register").send({
      email: "test@example.com",
      password: "securePassword123",
      name: "Test User",
    });

    expect(response.status).toBe(201);
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.email).toBe("test@example.com");
  });

  it("should return an error if the email already exists and validate that only one user with that email exists", async () => {
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
      where: { email: "test2@example.com" }
    });
  
    expect(userCount).toBe(1);
  });

  it("should return an error if required fields are missing", async () => {
    const response = await request(app).post("/api/users/register").send({
      email: "invalid@example.com",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("errors");
  });

  it("should return an error if an invalid email is entered", async () => {
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
