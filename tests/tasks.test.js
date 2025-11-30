const request = require('supertest');
const app = require('../backend/src/app'); // Ajusta según tu proyecto

describe('GET /tasks', () => {
    test('Debe devolver un array de tareas', async () => {
        const res = await request(app).get('/tasks');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
