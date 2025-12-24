const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'topics_db', // nombre DB
  'root',               // usuario
  '1234abcd',           // contraseña
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // no spam en consola
  }
);

module.exports = { sequelize };
