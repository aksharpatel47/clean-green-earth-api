const Router = require('express').Router;
const controllers = require('./users.controllers');
const userImageUpload = require('../middleware/image-upload.middleware').userImageUpload;

const userRoutes = Router();

userRoutes
  .post('/', controllers.createUser)
  .patch('/', userImageUpload.single('user-image'), controllers.updateUserDetails)
  .get('/id', controllers.getUserDetails)
  .get('/:id/events', controllers.getUserEvents)
  .get('/:id/attendance', controllers.getEventsWithUserAttendance);

module.exports = userRoutes;