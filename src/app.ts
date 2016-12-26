import * as express from 'express';

import * as bodyParser from 'body-parser';
import firebaseAuthMiddleware from './middleware/firebase-auth.middleware';

import eventRoutes from './events';
import userRoutes from './users';

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(firebaseAuthMiddleware);

// Routes
app.use('/users', userRoutes);
app.use('/events', eventRoutes);

export default app;
