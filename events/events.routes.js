const Router = require('express').Router;
const controllers = require('./events.controllers');
const attendanceRoutes = require('../attendance/attendance.routes');

const eventRoutes = Router();

eventRoutes
  .post('/', controllers.createEvent)
  .put('/:id', controllers.updateEvent)
  .delete('/:id', controllers.deleteEvent)

eventRoutes.use('/:id/attendance', attendanceRoutes)

  module.exports = eventRoutes