import Sequelize from 'sequelize';

module.exports = {
  user: {
    name: Sequelize.STRING,
    age: Sequelize.INTEGER,
    sex: Sequelize.STRING,
  },
};
