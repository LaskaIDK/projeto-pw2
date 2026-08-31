const mongoose = require('mongoose');

async function connectDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('A variável MONGODB_URI não foi definida.');
  }

  await mongoose.connect(uri);
  console.log('MongoDB conectado.');
}

module.exports = connectDatabase;
