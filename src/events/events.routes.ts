import { Router } from 'express';
import {
  getAllEvents,
  getEventDetails,
  createEvent,
  updateEvent,
  deleteEvent
} from './events.controllers';

const EventsRoutes = Router();

EventsRoutes
  .get('/', getAllEvents)
  .get('/:id', getEventDetails)
  .post('/', createEvent)
  .put('/:id', updateEvent)
  .delete('/:id', deleteEvent);

export default EventsRoutes;