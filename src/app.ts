import * as express from 'express';
import UserRoutes from "./user/user.routes";

const app = express();

// Add Middlewares Here...

// Add Routes Here...
app.use('/user', UserRoutes);

export default app;