const Router = require('express').Router;
const controllers = require('./events.controllers');
const attControllers = require('../attendance/attendance.controllers');

const eventRoutes = Router();

eventRoutes
  .get('/', controllers.getEvents)
  .get('/:id', controllers.getEventDetails)
  .post('/', controllers.createEvent)
  .put('/:id', controllers.updateEvent)
  .delete('/:id', controllers.deleteEvent)
  .post('/:id/attendance', attControllers.attendEvent)
  .delete('/:id/attendance', attControllers.removeAttendanceFromEvent);

module.exports = eventRoutes