const Router = require('express').Router;
const controllers = require('./account.controllers');

const accountRoutes = Router();

accountRoutes
  .post('/', controllers.createAccount);

module.exports = accountRoutes;