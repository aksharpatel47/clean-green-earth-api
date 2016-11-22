const Router = require('express').Router;
const controllers = require('./events.controllers');

const eventRoutes = Router();

eventRoutes
  .post('/', controllers.createEvent)
  .put('/:id', controllers.updateEvent)
  .delete('/:id', controllers.deleteEvent)

  module.exports = eventRoutes