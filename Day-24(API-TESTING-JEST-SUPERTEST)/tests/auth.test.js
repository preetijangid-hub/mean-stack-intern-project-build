require("./setup");

const request = require("supertest");
const jwt = require("jsonwebtoken");

const app = require("../app");
const User = require("../models/User");

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
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("User registered successfully");
    expect(typeof response.body.token).toBe("string");
    expect(response.body.token.length).toBeGreaterThan(0);

    // contract matches the Day-28 auth API: token only, no user object
    expect(response.body).not.toHaveProperty("user");

    // token should carry the new user's id
    const payload = jwt.decode(response.body.token);
    expect(payload).toHaveProperty("id");
  });

  test("POST /api/auth/register - should save user with hashed password", async () => {
    const savedUser = await User.findOne({ email: testUser.email });

    expect(savedUser).not.toBeNull();
    expect(savedUser.name).toBe(testUser.name);
    expect(savedUser.password).not.toBe(testUser.password);
  });

  test("POST /api/auth/register - should reject missing fields", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        email: "missing@example.com",
      });

    expect(response.statusCode).toBe(400);
  });

  test("POST /api/auth/register - should reject invalid email", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Invalid Email",
        email: "invalid-email",
        password: "password123",
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
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Login successful");
    expect(typeof response.body.token).toBe("string");
    expect(response.body.token.length).toBeGreaterThan(0);
    expect(response.body).not.toHaveProperty("user");

    const payload = jwt.decode(response.body.token);
    expect(payload).toHaveProperty("id");
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