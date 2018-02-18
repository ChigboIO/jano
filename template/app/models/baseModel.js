'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const sequelize = require('../../config/connection');
const Schema = require('../../db/schema');

const basename = path.basename(module.filename);
const Model = {};

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach(file => {
    const modelName = file.split('.')[0];
    /* eslint-disable no-unused-vars */
    const model = sequelize.import(modelName, (seq, Types) => {
      return seq.define(modelName, Schema[modelName]);
    });
    /* eslint-enable no=unused-vars */
    Model[modelName] = model;
  });

Model[sequelize] = sequelize;
Model[Sequelize] = Sequelize;

module.exports = Model;

