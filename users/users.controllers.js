const db = require('../db');

exports.createUser = function createUser(req, res) {
  const { uid } = req.body;
  
  const query = 'insert into users(uid) values ($1)';
  
  db.none(query, [uid])
    .then(() => {
      res.status(201).send({data: 'created'});
    }, (err) => {
      res.status(400).send({data: err});
    });
};

exports.updateUserDetails = function updateUserDetails(req, res) {
  const { uid, name } = req.body;

  const query = 'update users set name = $1, updated_on = $2 where uid = $3';

  db.none(query, [name, new Date(), uid])
    .then(() => {
      res.status(200).send({data: 'success'});
    }, (err) => {
      res.status(400).send({data: err});
    });
};

exports.getUserDetails = function getUserDetails(req, res) {
  const { uid } = req.body;
  
  const query = 'select u.uid as "userId", u.name as "userName" from users u where uid = $1';
  
  db.one(query, [uid])
    .then((data) => {
      res.json({data});
    }, (err) => {
      res.status(400).send({data: err});
    })
};

exports.getUserEvents = function getUserEvents(req, res) {
  const userId = req.params.id;

  const query = `select e.id, e.title, e.description, e.location, e.address, e.date, e.duration,
  e.user_id as "userId", u.name as "userName" from events e
  left join users u on e.user_id = u.uid where u.uid = $1`;

  db.manyOrNone(query, [userId])
    .then((events) => {
      res.json({data: events});
    }, (err) => {
      res.status(400).json({data: err});
    });
}

exports.getEventsWithUserAttendance = function getEventsWithUserAttendance(req, res) {
  const userId = req.params.id;

  const query = `select e.id, e.title, e.description, e.location, e.address, e.date, e.duration,
  e.user_id as "userId", u.name as "userName" from events e
  left join users u on u.uid = e.user_id
  left join attendance a on a.event_id = e.id
  where a.user_id = $1
  order by e.date asc`;

  db.manyOrNone(query, [userId])
    .then((events) => {
      res.json({data: events});
    }, (err) => {
      res.status(400).json({data: err})
    });
}