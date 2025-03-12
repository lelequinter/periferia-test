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

  it("should log in a user successfully", async () => {
    await request(app).post("/api/users/register").send({
      email: "testLogin@example.com",
      password: "securePassword123",
      name: "Test Login User",
    });

    const responseLogin = await request(app).post("/api/users/login").send({
      email: "testLogin@example.com",
      password: "securePassword123",
    });

    expect(responseLogin.status).toBe(200);
    expect(responseLogin.body.user).toHaveProperty("id");
    expect(responseLogin.body.user).toHaveProperty("name");
    expect(responseLogin.body.user).toHaveProperty("email");
    expect(responseLogin.body.user).toHaveProperty("token");
  });

  it("should return an error when attempting to log in", async () => {
    await request(app).post("/api/users/register").send({
      email: "testLogin@example.com",
      password: "securePassword123",
      name: "Test Login User",
    });

    const responseLogin = await request(app).post("/api/users/login").send({
      email: "invalidEmail@example.com",
      password: "securePassword123",
    });

    expect(responseLogin.status).toBe(400);
    expect(responseLogin.body).toHaveProperty("message", "Error al ingresar a la aplicación");
    expect(responseLogin.body).toHaveProperty("error", "Usuario o contraseña invalidos.");
  });

  it("should return an error for missing required fields", async () => {
    const responseLogin = await request(app).post("/api/users/login").send({});

    expect(responseLogin.status).toBe(400);
    expect(responseLogin.body).toHaveProperty("message");
    expect(responseLogin.body).toHaveProperty("errors", [
        "El campo correo es obligatorio",
        "El campo contraseña es obligatorio"
    ]);
  });

  it("should return an error if an invalid email is entered", async () => {
    const responseLogin = await request(app).post("/api/users/login").send({
      email: "invalidEmail",
      password: "securePassword123",
    });

    expect(responseLogin.status).toBe(400);
    expect(responseLogin.body).toHaveProperty("message");
    expect(responseLogin.body).toHaveProperty("errors", ["Debe ser un email válido"]);
  }) 
});
