import { jest } from "@jest/globals";

jest.unstable_mockModule("../src/models/Task.js", () => ({
  __esModule: true,
  default: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
  },
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
}));

let request;
let app;
let TaskModule;
let Task;

beforeAll(async () => {
  request = (await import("supertest")).default;
  app = (await import("../src/app.js")).default;

  TaskModule = await import("../src/models/Task.js");
  Task = TaskModule.default ?? TaskModule;
});

describe("CRUD de Tasks", () => {
  test("GET /api/tasks debe devolver un array de tareas", async () => {
    Task.findAll.mockResolvedValue([
      { id: 1, title: "Tarea 1" },
      { id: 2, title: "Tarea 2" },
    ]);

    const res = await request(app).get("/api/tasks");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });

  // ------------------ POST ------------------
  test("POST /api/tasks debe crear una tarea", async () => {

    const nuevaTarea = { title: "Nueva Tarea", completed: false };

    Task.create.mockResolvedValue({ id: 10, ...nuevaTarea });

    const res = await request(app)
      .post("/api/tasks")
      .send(nuevaTarea);

    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBe(10);
    expect(res.body.title).toBe("Nueva Tarea");
  });

  // ------------------ PUT ------------------
test("PUT /api/tasks/:id debe actualizar una tarea", async () => {
  Task.findByPk.mockResolvedValue({
    id: 1,
    title: "Vieja",
    update: jest.fn(function (data) {
      Object.assign(this, data);
      return this;
    }),
  });

  const res = await request(app)
    .put("/api/tasks/1")
    .send({ title: "Actualizada" });

  expect(res.statusCode).toBe(200);
  expect(res.body.title).toBe("Actualizada");
});

  // ------------------ DELETE ------------------
  test("DELETE /api/tasks/:id debe eliminar una tarea", async () => {

    Task.findByPk.mockResolvedValue({
      id: 7,
      destroy: jest.fn().mockResolvedValue(true)
    });

    const res = await request(app).delete("/api/tasks/7");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Deleted");
  });

});
