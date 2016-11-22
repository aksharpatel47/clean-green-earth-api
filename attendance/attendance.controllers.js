const db = require('../db');

exports.attendEvent = function attendEvent(req, res) {
  const { uid } = req.body;
  const eventId = req.params.id;

  const query = `insert into attendance(user_id, event_id) values($1, $2)`;
  const values = [uid, eventId];

  db.none(query, values)
    .then(() => {
      res.json({data: {message: 'success'}});
    }, (err) => {
      res.status(400).json({data: err});
    });
}

exports.removeAttendanceFromEvent = function removeAttendanceFromEvent(req, res) {
  const { uid } = req.body;
  const eventId = req.params.id;

  const query = `delete from attendance where user_id = $1 and event_id = $2`;
  const values = [uid, eventId];

  db.none(query, values)
    .then(() => {
      res.json({data: {message: 'success'}})
    }, (err) => {
      res.status(400).json({data: err});
    });
}