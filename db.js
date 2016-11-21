const pgp = require('pg-promise')();

const connection = {
  host: 'localhost',
  port: '5432',
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD
};

module.exports = pgp(connection);