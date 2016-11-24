const Router = require('express').Router;
const controllers = require('./users.controllers');

const userRoutes = Router();

userRoutes
  .post('/', controllers.createUser)
  .patch('/', controllers.updateUserDetails)
  .get('/', controllers.getUserDetails)
  .get('/:id/events', controllers.getUserEvents)
  .get('/:id/attendance', controllers.getEventsWithUserAttendance);

module.exports = userRoutes;