const Router = require('express').Router;
const controllers = require('./account.controllers');

const accountRoutes = Router();

accountRoutes
  .post('/', controllers.createAccount)
  .patch('/', controllers.updateAccount)
  .get('/', controllers.getAccountDetails);

module.exports = accountRoutes;