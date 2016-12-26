import * as pgp from 'pg-promise';

const db = pgp();

const config: pgp.IConfig = {
  host: 'localhost',
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};

export default db(config);