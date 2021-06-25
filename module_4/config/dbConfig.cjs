require('dotenv').config({ path: `${__dirname}/../../.env` });

module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || '5432',
  database: process.env.DB_TYPE || 'postgres',
  dialect: process.env.DB_DIALECT || 'postgres',
};
