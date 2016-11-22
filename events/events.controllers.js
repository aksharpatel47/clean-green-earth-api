const db = require('../db');
const uuid = require('uuid');

exports.getEventDetails = function getEventDetails(req, res) {
  const eventId = req.params.id;

  const query = `select * from events where id = $1`;
  const values = [eventId];

  db.one(query, values)
    .then((eventData) => {
      res.status(200).json({data: eventData})
    }, (err) => {
      res.status(400).json({data: err});
    });
}

exports.getEvents = function getEvents(req, res) {
  const { latitude, longitude, radius } = req.query;

  const query = `select * from events as ev where (($1::point <@> ev.location)::numeric * 1.61) < $2`;
  const values = [`(${longitude},${latitude})`, radius]

  db.many(query, values)
    .then((events) => {
      res.status(200).json({data: events});
    }, (err) => {
      res.status(400).json({data: err});
    })
}

exports.createEvent = function createEvent(req, res) {
  const { uid, title, description, location, date, startTime, endTime } = req.body;
  const { latitude, longitude } = location;

  const eventId = uuid.v4();

  const query = `insert into events(id, title, description, location, date, start_time, end_time, user_id)
  values($1, $2, $3, $4, $5, $6, $7, $8)`;
  const values = [eventId, title, description, `(${longitude},${latitude})`, date, startTime, endTime, uid];

  db.none(query, values)
    .then(() => {
      res.status(201).json({data: {eventId}});
    }, (err) => {
      res.status(400).json({data: err});
    })
}

exports.updateEvent = function updateEvent(req, res) {
  const eventId = req.params.id;
  const { uid, title, description, location, date, startTime, endTime } = req.body;

  const { latitude, longitude } = location;

  const query = `update events set title = $1, description = $2, location = $3, date = $4, start_time = $5, 
    end_time = $6 where id = $7 and user_id = $8`;
  const values = [title, description, `(${longitude},${latitude})`, date, startTime, endTime, eventId, uid]

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

  const query = 'delete from events where user_id = $1 and id = $2';
  const values = [uid, eventId];

  db.none(query, values)
    .then(() => {
      res.status(200).json({data: {message: 'success'}});
    }, (err) => {
      res.status(400).json({data: err});
    });
}