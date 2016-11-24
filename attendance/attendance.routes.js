const Router = require('express').Router;
const controllers = require('./attendance.controllers');

const attendanceRoutes = Router();

attendanceRoutes
  .get('/:id/attendance', controllers.getAttendees)
  .post('/:id/attendance', controllers.attendEvent)
  .delete('/:id/attendance', controllers.removeAttendanceFromEvent);

module.exports = attendanceRoutes;
