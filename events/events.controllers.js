const db = require('../db');
const uuid = require('uuid');

/**
 * Get details of the event with id sent in the params.
 */
exports.getEventDetails = function getEventDetails(req, res) {
  const eventId = req.params.id;

  const query = `select e.id, e.title, e.description, e.location, e.address, e.date, e.duration, 
  e.user_id as "userId", us.name as "userName"
  from events as e 
  left join users as us on e.user_id = us.uid
  where e.id = $1;`;

  const values = [eventId];

  db.oneOrNone(query, values)
    .then((eventData) => {
      if (!eventData) {
        return res.status(404).json({data: {message: 'No such event exists.'}});
      }
      
      res.status(200).json({data: eventData})
    }, (err) => {
      res.status(400).json({data: err});
    });
}

/**
 * Search Events happening around a location within a particular radius.
 */
exports.searchEvents = function searchEvents(req, res) {
  const { latitude, longitude, radius } = req.query;

  const query = `select e.id, e.title, e.description, e.location, e.address, e.date, e.duration,
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

/**
 * Create Event and send the eventId back.
 */
exports.createEvent = function createEvent(req, res) {
  const { uid, title, description, location, address, date, duration } = req.body;
  const { latitude, longitude } = location;

  const eventId = uuid.v4();

  const query = `insert into events(id, title, description, location, address, date, duration, user_id)
  values($1, $2, $3, $4, $5, $6, $7, $8)`;
  const values = [eventId, title, description, `(${longitude},${latitude})`, address, date, duration, uid];

  db.none(query, values)
    .then(() => {
      res.status(201).json({data: {eventId}});
    }, (err) => {
      res.status(400).json({data: err});
    })
}

/**
 * Update event details based on the id sent in the params. It
 * updates all the details of the event apart from the duration.
 */
exports.updateEvent = function updateEvent(req, res) {
  const eventId = req.params.id;
  const { uid, title, description, location, address, date, duration } = req.body;

  const { latitude, longitude } = location;

  const query = `update events set title = $1, description = $2, location = $3, address = $4, date = $5, duration = $6,
  updated_on = $7 where id = $8 and user_id = $9`;
  const values = [title, description, `(${longitude},${latitude})`, address, date, duration, new Date(), eventId, uid]

  db.none(query, values)
    .then(() => {
      res.status(200).json({data: {message: 'success'}});
    }, (err) => {
      res.status(400).json({data: err});
    });
}

/**
 * Delete the event based on the id sent in the params.
 */
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