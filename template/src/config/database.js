/* eslint-disable key-spacing */

const defaultEnv = {
  database  : 'testing',
  username  : '',
  password  : '',
  host      : 'localhost',
  dialect   : 'sqlite', // dialect: 'mysql'|'sqlite'|'postgres'|'mssql'
  storage   : 'sqlites/development.sqlite', // SQLite only
  pool      : { max: 5, min: 0, idle: 10000 },
};

const environment = {
  development: { ...defaultEnv,
    username  : '',
    password  : '',
  },

  production: { ...defaultEnv,
    database  : '',
    username  : '',
    password  : '',
    dialect   : 'postgres',
  },

  test: { ...defaultEnv,
    username  : '',
    password  : '',
    storage   : 'sqlites/test.sqlite', // SQLite only
    pool      : { max: 5, min: 0, idle: 10000 },
  },
};

module.exports = environment;
