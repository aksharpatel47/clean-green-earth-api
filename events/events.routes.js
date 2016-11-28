const Router = require('express').Router;
const controllers = require('./events.controllers');
const attRoutes = require('../attendance/attendance.routes');
const eventImageUpload = require('../middleware/image-upload.middleware').eventImageUpload;

const eventRoutes = Router();

eventRoutes
  .get('/', controllers.searchEvents)
  .get('/:id', controllers.getEventDetails)
  .post('/', eventImageUpload.single('event-image'), controllers.createEvent)
  .put('/:id', controllers.updateEvent)
  .delete('/:id', controllers.deleteEvent);

eventRoutes.use('/', attRoutes);

module.exports = eventRoutes