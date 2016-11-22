const db = require('../db');
const uuid = require('uuid');

exports.createEvent = function createEvent(req, res) {
  const { uid, title, description, location, dateInSeconds, startTimeInSeconds, endTimeInSeconds } = req.body;
  const { latitude, longitude } = location;

  const eventId = uuid.v4();
  const date = new Date(dateInSeconds);
  const startTime = new Date(startTimeInSeconds);
  const endTime = new Date(endTimeInSeconds);

  const query = `insert into events(id, title, description, location, date, start_time, end_time, user_id)
  values($1, $2, $3, $4, $5, $6, $7, $8)`;
  const values = [eventId, title, description, `(${longitude},${longitude})`, date, startTime, endTime, uid];

  db.none(query, values)
    .then(() => {
      res.status(201).json({data: {message: 'success'}});
    }, (err) => {
      res.status(400).json({data: err});
    })
}

exports.updateEvent = function updateEvent(req, res) {
  const eventId = req.params.id;
  const { uid, title, description, location, dateInSeconds, startTimeInSeconds, endTimeInSeconds } = req.body;

  const { latitude, longitude } = location;
  const date = new Date(dateInSeconds);
  const startTime = new Date(startTimeInSeconds);
  const endTime = new Date(endTimeInSeconds);

  const query = `update events set title = $1, description = $2, location = $3, date = $4, start_time = $5, 
    end_time = $6 where id = $7 and user_id = $8`;
  const values = [title, description, `(${longitude},${latitude})`, date, startTime, endTime, uid, eventId]

  db.none(query, values)
    .then(() => {
      res.status(200).json({data: {message: 'success'}});
    }, (err) => {
      res.status(400).json({data: err});
    });
}

exports.deleteEvent = function deleteEvent(req, res) {
  const eventId = req.params.id;
  const { uid } = req.body;

  const query = 'delete from events where uid = $1 and id = $2';
  const values = [uid, eventId];

  db.none(query, values)
    .then(() => {
      res.status(200).json({data: {message: 'success'}});
    }, (err) => {
      res.status(400).json({data: err});
    });
}