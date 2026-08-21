const request = require("supertest");
const mongoose = require("mongoose");


const app = require("../app");
const connectDB = require("../config/db");

beforeAll(async () => {
  await connectDB();
}, 15000);

afterAll(async () => {
  await mongoose.connection.close();
});

describe("AUTH API TESTS", () => {
  const testUser = {
    name: "Test User",
    email: `test${Date.now()}@example.com`,
    password: "password123",
  };

  test("POST /api/auth/register - should register user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(testUser);

    expect(response.statusCode).toBe(201);

    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user");
  });

  test("POST /api/auth/register - should reject missing fields", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        email: "missing@example.com",
      });

    expect(response.statusCode).toBe(400);
  });

  test("POST /api/auth/register - should reject short password", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Short Password",
        email: `short${Date.now()}@example.com`,
        password: "123",
      });

    expect(response.statusCode).toBe(400);
  });

  test("POST /api/auth/register - should reject duplicate user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(testUser);

    expect(response.statusCode).toBe(409);
  });

  test("POST /api/auth/login - should login successfully", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  test("POST /api/auth/login - should reject wrong password", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: testUser.email,
        password: "wrongpassword",
      });

    expect(response.statusCode).toBe(401);
  });

  test("POST /api/auth/login - should reject missing fields", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: testUser.email,
      });

    expect(response.statusCode).toBe(400);
  });
});