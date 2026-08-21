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

describe("TASK API TESTS", () => {
  let token;
  let taskId;

  beforeAll(async () => {
    const user = {
      name: "Task Test User",
      email: `task${Date.now()}@example.com`,
      password: "password123",
    };

    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send(user);

    token = registerResponse.body.token;
  });

  test("GET /api/tasks - should reject request without token", async () => {
    const response = await request(app)
      .get("/api/tasks");

    expect(response.statusCode).toBe(401);
  });

  test("GET /api/tasks - should return tasks", async () => {
    const response = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("tasks");
    expect(response.body).toHaveProperty("count");
  });

  test("POST /api/tasks - should create task", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Learn Jest",
        description: "Write API tests",
        completed: false,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("task");

    taskId = response.body.task._id;
  });

  test("POST /api/tasks - should reject missing title", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "Task without title",
      });

    expect(response.statusCode).toBe(400);
  });

  test("GET /api/tasks/:id - should return task", async () => {
    const response = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("task");
  });

  test("PUT /api/tasks/:id - should update task", async () => {
    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        completed: true,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.task.completed).toBe(true);
  });

  test("DELETE /api/tasks/:id - should delete task", async () => {
    const response = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });

  test("GET /api/tasks/:id - should return 404 for deleted task", async () => {
    const response = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
  });

  test("GET /invalid-route - should return 404", async () => {
    const response = await request(app)
      .get("/invalid-route");

    expect(response.statusCode).toBe(404);
  });
});