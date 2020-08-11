const knex = require('knex');
const configuration = require('../../knexfile');//importanto as configurações do arquivo knexfile, o '..' volta as pastas.

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

const connection = knex(config); //conexão de desenvolvimento

module.exports = connection; // exportar a conexão com o banco de dados
