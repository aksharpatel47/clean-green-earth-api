import { Router } from 'express';
import * as controllers from './users.controllers';
import { userImageUpload } from '../middleware/image-upload.middleware';

const userRoutes = Router();

userRoutes
  .post('/', controllers.createUser)
  .patch('/', userImageUpload.single('user-image'), controllers.updateUserDetails)
  .get('/id', controllers.getUserDetails)
  .get('/:id/events', controllers.getUserEvents)
  .get('/:id/attendance', controllers.getEventsWithUserAttendance);

export default userRoutes;