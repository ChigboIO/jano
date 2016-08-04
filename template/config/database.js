/* eslint-disable key-spacing */
'use strict';

const defaultEnv = {
  database  : 'testing',
  username  : '',
  password  : '',
  host      : 'localhost',
  dialect   : 'sqlite', // dialect: 'mysql'|'sqlite'|'postgres'|'mssql'
  storage   : 'db/development.sqlite', // SQLite only
  pool      : { max: 5, min: 0, idle: 10000 }
};

const environment = {
  development: Object.assign({}, defaultEnv, {
    username  : '',
    password  : ''
  }),

  production: Object.assign({}, defaultEnv, {
    database  : '',
    username  : '',
    password  : '',
    dialect   : 'postgres'
  }),

  test: Object.assign({}, defaultEnv, {
    username  : '',
    password  : '',
    storage   : 'db/test.sqlite', // SQLite only
    pool      : { max: 5, min: 0, idle: 10000 }
  })
};

module.exports = environment;
