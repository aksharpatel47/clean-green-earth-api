const db = require('../db');
const uuid = require('uuid');

exports.getEventDetails = function getEventDetails(req, res) {
  const eventId = req.params.id;

  const query = `select e.id, e.title, e.description, e.location, e.date, e.duration, 
  e.user_id as "userId", us.name as "userName"
  from events as e 
  left join users as us on e.user_id = us.uid
  where e.id = $1;`;

  const values = [eventId];

  db.one(query, values)
    .then((eventData) => {
      res.status(200).json({data: eventData})
    }, (err) => {
      res.status(400).json({data: err});
    });
}

exports.searchEvents = function searchEvents(req, res) {
  const { latitude, longitude, radius } = req.query;

  const query = `select e.id, e.title, e.description, e.location, e.date, e.duration,
  e.user_id as "userId", u.name as "userName"
  from events as e
  left join users u on e.user_id = u.uid 
  where (($1::point <@> e.location)::numeric * 1.61) < $2`;
  const values = [`(${longitude},${latitude})`, radius]

  db.manyOrNone(query, values)
    .then((events) => {
      res.status(200).json({data: events});
    }, (err) => {
      res.status(400).json({data: err});
    })
}

exports.createEvent = function createEvent(req, res) {
  const { uid, title, description, location, date, duration } = req.body;
  const { latitude, longitude } = location;

  const eventId = uuid.v4();

  const query = `insert into events(id, title, description, location, date, duration, user_id)
  values($1, $2, $3, $4, $5, $6, $7)`;
  const values = [eventId, title, description, `(${longitude},${latitude})`, date, duration, uid];

  db.none(query, values)
    .then(() => {
      res.status(201).json({data: {eventId}});
    }, (err) => {
      res.status(400).json({data: err});
    })
}

exports.updateEvent = function updateEvent(req, res) {
  const eventId = req.params.id;
  const { uid, title, description, location, date, duration } = req.body;

  const { latitude, longitude } = location;

  const query = `update events set title = $1, description = $2, location = $3, date = $4, duration = $5,
  updated_on = $6 where id = $7 and user_id = $8`;
  const values = [title, description, `(${longitude},${latitude})`, date, duration, new Date(), eventId, uid]

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