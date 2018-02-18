'use strict';

const sequelize = require('../config/connection');
const fs = require('fs');
const util = require('util');
const _ = require('lodash');
const Utils = require('sequelize/lib/utils');

module.exports = () => {
  let data = {};
  const writeToSchemaFile = (tableName, attributes) => {
    const newObj = {};
    newObj[Utils.singularize(tableName).toLowerCase()] = attributes;
    data = _.assign(data, newObj);

    const content = `'use strict';

module.exports = ${util.inspect(data, false, null)};
`;

    fs.writeFile('./db/schema.js', content, err => {
      if (err) return console.log(err);

      return console.log('Schema file updated!');
    });
  };

  sequelize.getQueryInterface().showAllTables().then(tables => {
    tables.forEach(table => {
      sequelize.getQueryInterface().describeTable(table).then(attributes => {
        writeToSchemaFile(table, attributes);
      });
    });
  });
};
