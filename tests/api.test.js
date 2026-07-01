const request = require('supertest');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({ mensagem: 'API funcionando!' });
});

describe('Teste da API', () => {
  test('Deve retornar mensagem de funcionamento', async () => {
    const response = await request(app).get('/');

    expect(response.statusCode).toBe(200);
    expect(response.body.mensagem).toBe('API funcionando!');
  });
});
