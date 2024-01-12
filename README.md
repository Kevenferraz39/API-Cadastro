# Criando uma API em JavaScript para Cadastro Automático no MongoDB

Para criar uma API em JavaScript que realiza o cadastro automático de dados fornecidos pelo usuário em um banco de dados MongoDB, siga os passos abaixo. Este exemplo utiliza Node.js e Express para criar o servidor da API, e MongoDB como banco de dados. Certifique-se de ter o Node.js e o npm instalados no seu ambiente.

## 1. Instalação de Dependências

Execute o seguinte comando no seu terminal para criar um novo projeto Node.js e instalar as dependências necessárias.

```bash
npm init -y
npm install express mongoose body-parser
```

## 2. Criando o Servidor Express

Crie um arquivo `app.js` (ou outro nome de sua escolha) e adicione o seguinte código:

```javascript
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
```

## 3. Executando o Servidor

Execute o seguinte comando para iniciar o servidor:

```bash
node app.js
```

O servidor estará acessível em `http://localhost:3000`.

## 4. Testando a API

Utilize ferramentas como Postman, Insomnia ou cURL para testar a API. Envie solicitações POST para `http://localhost:3000/api/cadastrar` com os dados do usuário no corpo da solicitação.

Lembre-se de que este é um exemplo básico. Adapte o código conforme necessário para atender às especificidades do seu projeto, incluindo segurança, validação de entrada e outros aspectos importantes ao desenvolver uma aplicação em produção.
