const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Conecta ao banco de dados MongoDB (certifique-se de ter o MongoDB instalado)
mongoose.connect('mongodb://localhost/seu_banco_de_dados', { useNewUrlParser: true, useUnifiedTopology: true });

// Define o esquema do banco de dados
const Schema = mongoose.Schema;
const userSchema = new Schema({
  nome: String,
  email: String,
  // Adicione mais campos conforme necessário
});

const User = mongoose.model('User', userSchema);

// Middleware para analisar o corpo das requisições
app.use(bodyParser.json());

// Rota para cadastrar um usuário
app.post('/api/cadastrar', (req, res) => {
  const { nome, email } = req.body;

  const newUser = new User({
    nome,
    email,
    // Atribua outros campos conforme necessário
  });

  newUser.save((err) => {
    if (err) {
      res.status(500).send('Erro ao cadastrar usuário');
    } else {
      res.status(201).send('Usuário cadastrado com sucesso');
    }
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
