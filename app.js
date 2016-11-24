const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(require('./middleware/authentication.middleware'));

// Routes
app.use('/users', require('./users/users.routes'));
app.use('/events', require('./events/events.routes'));
// app.use('/events', require('./attendance/attendance.routes'));

module.exports = app;