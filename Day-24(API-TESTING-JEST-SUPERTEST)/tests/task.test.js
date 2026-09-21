require("./setup");

const request = require("supertest");
const jwt = require("jsonwebtoken");

const app = require("../app");

describe("TASK API TESTS", () => {
  let token;
  let taskId;
  let userId;

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
    userId = jwt.decode(token).id;
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

  test("POST /api/tasks - should create task for logged in user", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Learn Jest",
        description: "Write API tests",
        completed: false,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Task created successfully");
    expect(response.body.task.title).toBe("Learn Jest");
    expect(response.body.task.description).toBe("Write API tests");
    expect(response.body.task.completed).toBe(false);

    // task should belong to the authenticated user
    expect(String(response.body.task.user)).toBe(userId);

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
    expect(response.body.task._id).toBe(taskId);
    expect(response.body.task.title).toBe("Learn Jest");
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