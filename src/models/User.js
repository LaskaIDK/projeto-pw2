const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'O nome é obrigatório.'],
      trim: true,
      minlength: [2, 'O nome deve ter pelo menos 2 caracteres.']
    },
    email: {
      type: String,
      required: [true, 'O e-mail é obrigatório.'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Informe um e-mail válido.']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
