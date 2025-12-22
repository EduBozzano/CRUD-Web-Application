const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'learning_topics_db', // nombre DB
  'root',               // usuario
  'password',           // contraseña
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // no spam en consola
  }
);

module.exports = { sequelize };
