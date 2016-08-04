'use strict';

const Sequelize = require('sequelize');
const environment = require('./database');

const env = process.env.NODE_ENV || 'development';
const db = environment[env];

const sequelize = new Sequelize(
  db.database,
  db.username,
  db.password,
  {
    host: db.host,
    dialect: db.dialect,
    pool: db.pool,
    storage: db.storage // SQLite only
  }
);

sequelize
  .authenticate()
  .then((conn) => {
    console.log(`Connection has been established successfully. ${conn}`);
  })
  .catch((err) => {
    console.log(`Unable to connect to the database: ${err}`);
  });

module.exports = sequelize;
