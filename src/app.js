const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.use('/api/users', usersRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada.' });
});

app.use((error, req, res, next) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Dados inválidos.',
      details: Object.values(error.errors).map((item) => item.message)
    });
  }

  if (error.code === 11000) {
    return res.status(409).json({ error: 'O e-mail informado já está cadastrado.' });
  }

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'ID inválido.' });
  }

  console.error(error);
  res.status(500).json({ error: 'Erro interno do servidor.' });
});

module.exports = app;
