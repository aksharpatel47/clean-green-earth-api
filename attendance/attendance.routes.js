const Router = require('express').Router;
const controllers = require('./attendance.controllers');

const attendanceRoutes = Router();

attendanceRoutes
  .post('/', controllers.attendEvent)
  .delete('/', controllers.removeAttendanceFromEvent);

module.exports = attendanceRoutes;
