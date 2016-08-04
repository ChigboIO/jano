'use strict';

const Model = require('./baseModel');

class User extends Model.user {
  whoAmI() {
    console.log(`My name is ${this.name}. I am ${this.age} years old.`);
  }
}

module.exports = User;
