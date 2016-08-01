import Model from './baseModel';

class User extends Model.user {
  whoAmI() {
    console.log(`My name is ${this.name}. I am ${this.age} years old.`);
  }
}

export default User;
