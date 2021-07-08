require('dotenv').config({ path: `${__dirname }/../../.env` })

module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_TYPE,
  dialect: process.env.DB_DIALECT,
};
