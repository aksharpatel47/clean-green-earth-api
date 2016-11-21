const express = require('express');
const accountRoutes = require('./account/account.routes');
const authenticationMiddleware = require('./middleware/authentication.middleware');
const bodyParser = require('body-parser');

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use('/', authenticationMiddleware);

// Routes
app.use('/account', accountRoutes);

module.exports = app;