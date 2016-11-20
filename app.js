const express = require('express');
const accountRoutes = require('./account/account.routes');

const app = express();

// Routes
app.use('/account', accountRoutes);

module.exports = app;