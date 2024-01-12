const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'seu_banco_de_dados',
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão ao banco de dados estabelecida.');
  }
});

app.post('/cadastrar', (req, res) => {
  const { nome, email } = req.body;

  const sql = 'INSERT INTO usuarios (nome, email) VALUES (?, ?)';
  db.query(sql, [nome, email], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar usuário:', err);
      res.status(500).json({ error: 'Erro interno no servidor' });
    } else {
      console.log('Usuário cadastrado com sucesso!');
      res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor está escutando na porta ${port}`);
});
