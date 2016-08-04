'use strict';

const Sequelize = require('sequelize');

module.exports = {
  user: {
    name: Sequelize.STRING,
    age: Sequelize.INTEGER,
    sex: Sequelize.STRING
  }
};
