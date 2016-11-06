import * as express from 'express';
import UserRoutes from "./user/user.routes";
import SessionRoutes from './session/session.routes';
import OpportunitiesRoutes from './opportunities/opportunities.routes';
import EventsRoutes from './events/events.routes';

const app = express();

// Add Middlewares Here...

// Add Routes Here...
app.use('/user', UserRoutes);
app.use('/session', SessionRoutes);
app.use('/opportunities', OpportunitiesRoutes);
app.use('/events', EventsRoutes);

export default app;