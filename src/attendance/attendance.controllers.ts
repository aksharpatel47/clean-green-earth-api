import db from '../db';

export function getAttendees(req: any, res: any) {
  const eventId = req.params.id;

  const query = `select u.uid as "userId", u.name as "userName" from users as u
  left join attendance as a on a.user_id = u.uid
  left join events as e on e.id = a.event_id
  where e.id = $1`;
  const values = [eventId];

  db.manyOrNone(query, values)
    .then((data) => {
      res.json(data);
    }, (err) => {
      res.status(400).send(err);
    });
}

export function attendEvent(req: any, res: any) {
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

export function removeAttendanceFromEvent(req: any, res: any) {
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