const express = require('express');
const accountRoutes = require('./account/account.routes');
const authenticationMiddleware = require('./middleware/authentication.middleware');

const app = express();

// Middlewares
app.use('/', authenticationMiddleware);

// Routes
app.use('/account', accountRoutes);

module.exports = app;