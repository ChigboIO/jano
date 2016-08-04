'use strict';

const ApplicationController = require('./applicationController');
const User = require('../models/user.js');

class UsersController extends ApplicationController {
  constructor() {
    super();
    this.index = this.index.bind(this);
    this.create = this.create.bind(this);
    this.show = this.show.bind(this);
    this.destroy = this.destroy.bind(this);
    this._userParams = this._userParams.bind(this);
  }

  /* GET users listing. */
  index(req, res) {
    User.findAll()
      .then(users => {
        res.status(200).json(users);
      })
      .catch((err) => {
        res.status(501).json(`::Error:: ${err}`);
      });
  }

  /* CREATE new user */
  create(req, res) {
    User.create(req.body, { fields: this._userParams() })
      .then((user) => {
        res.status(201).json(user.dataValues);
      })
      .catch((err) => {
        res.status(501).json(`::Error:: ${err}`);
      });
  }

  /* SHOW new user */
  show(req, res) {
    const id = req.params.id;
    User.findById(id)
      .then(user => {
        if (!user) {
          res.status(404).json('User Not Found');
          return;
        }
        res.json(user);
      })
      .catch((err) => {
        res.status(501).json(`::Error:: ${err}`);
      });
  }

  /* DELETE a user */
  destroy(req, res) {
    const id = req.params.id;
    User.findById(id)
    .then(user => user.destroy())
    .then(user => {
      res.json(`User '${user.name}' has been deleted`);
    })
    .catch(err => {
      res.status(501).json(`::Error:: Seems user with id '${id}' does not exist. ${err}`);
    });
  }

  _userParams() {
    return ['name', 'age', 'sex'];
  }
}

module.exports = UsersController;
