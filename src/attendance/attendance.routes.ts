import { Router } from 'express';
import * as controllers from './attendance.controllers';

const attendanceRoutes = Router();

attendanceRoutes
  .get('/:id/attendance', controllers.getAttendees)
  .post('/:id/attendance', controllers.attendEvent)
  .delete('/:id/attendance', controllers.removeAttendanceFromEvent);

export default attendanceRoutes;
