jest.setTimeout(60000);

const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../src/app');
const User = require('../src/models/User');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Health check', () => {
  it('informa que a API está funcionando', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ status: 'ok', database: 'connected' });
  });
});

describe('Users API', () => {
  it('cria e lista um usuário', async () => {
    const created = await request(app).post('/api/users').send({ name: 'Maria Silva', email: 'maria@example.com' });
    expect(created.statusCode).toBe(201);
    expect(created.body.name).toBe('Maria Silva');
    const list = await request(app).get('/api/users');
    expect(list.statusCode).toBe(200);
    expect(list.body).toHaveLength(1);
  });

  it('rejeita e-mail duplicado', async () => {
    const user = { name: 'Maria Silva', email: 'maria@example.com' };
    await request(app).post('/api/users').send(user);
    const response = await request(app).post('/api/users').send(user);
    expect(response.statusCode).toBe(409);
  });

  it('atualiza e remove um usuário', async () => {
    const created = await request(app).post('/api/users').send({ name: 'Maria Silva', email: 'maria@example.com' });
    const updated = await request(app).put('/api/users/' + created.body._id).send({ name: 'Maria Souza', email: 'maria.souza@example.com' });
    expect(updated.statusCode).toBe(200);
    expect(updated.body.name).toBe('Maria Souza');
    const removed = await request(app).delete('/api/users/' + created.body._id);
    expect(removed.statusCode).toBe(204);
    expect((await request(app).get('/api/users/' + created.body._id)).statusCode).toBe(404);
  });

  it('valida os dados obrigatórios', async () => {
    const response = await request(app).post('/api/users').send({ name: 'A', email: 'invalido' });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Dados inválidos.');
  });
});
