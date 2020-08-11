const express = require('express');
const routes = require('./routes'); // importar as rotas usando o require '/ - é o caminho relativo, informa que é um arquivo.
const { errors } = require('celebrate');
const cors = require('cors');

const app = express();

app.use(cors()); // esse módulo determina quem vai poder acessar a nossa aplicação
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;
//app.listen(3333);