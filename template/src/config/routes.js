/* eslint-disable new-cap */

import express from 'express';
const router = express.Router();

import HomeController from '../app/controllers/homeController';
import UsersController from '../app/controllers/usersController';

const home = new HomeController;
const users = new UsersController;

router.get('/', home.index);
router.get('/users', users.index);
router.post('/users', users.create);
router.get('/users/:id', users.show);
router.delete('/users/:id', users.destroy);

module.exports = router;
