const Router = require('express').Router;
const controllers = require('./events.controllers');
const attControllers = require('../attendance/attendance.controllers');

const eventRoutes = Router();

eventRoutes
  .get('/', controllers.searchEvents)
  .get('/:id', controllers.getEventDetails)
  .post('/', controllers.createEvent)
  .put('/:id', controllers.updateEvent)
  .delete('/:id', controllers.deleteEvent);

module.exports = eventRoutes