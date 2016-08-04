/* eslint-disable new-cap */
'use strict';

const express = require('express');
const router = express.Router();

const HomeController = require('../app/controllers/homeController');
const UsersController = require('../app/controllers/usersController');

const home = new HomeController();
const users = new UsersController();

router.get('/', home.index);
router.get('/users', users.index);
router.post('/users', users.create);
router.get('/users/:id', users.show);
router.delete('/users/:id', users.destroy);

module.exports = router;
