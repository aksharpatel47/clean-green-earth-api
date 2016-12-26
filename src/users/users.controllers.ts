import db from '../db';

/**
 * Creates user on the server. This is called after firebase creates
 * the user at their server.
 * @param req
 * @param res
 */
export function createUser(req: any, res: any) {
  const { uid, name } = req.body;

  const query = 'insert into users(uid, name) values ($1, $2)';

  db.none(query, [uid, name])
    .then(() => {
      res.status(201).send({ data: { message: 'created' } });
    }, (err) => {
      res.status(400).send({ data: err });
    });
}

/**
 *
 * @param req
 * @param res
 */
export function updateUserDetails(req: any, res: any) {
  const { uid, name } = req.body;

  let query = '';
  let values = [];

  if (req.file) {
    let fileName = req.file.filename;
    query = 'update users set image = $1, updated_on = $2 where uid = $3';
    values.push(fileName);
  } else if (name) {
    query = 'update users set name = $1, updated_on = $2 where uid = $3';
    values.push(name);
  }

  values.push(new Date(), uid);

  db.none(query, values)
    .then(() => {
      res.status(200).send({ data: { message: 'success' } });
    }, (err) => {
      res.status(400).send({ data: err });
    });
}

export function getUserDetails(req: any, res: any) {
  const userId = req.params.id;

  const query = 'select u.uid as "id", u.name from users u where uid = $1';

  db.one(query, [userId])
    .then((data) => {
      res.json({ data });
    }, (err) => {
      res.status(400).send({ data: err });
    })
}

export function getUserEvents(req: any, res: any) {
  const userId = req.params.id;

  const query = `select e.id, e.title, e.description, e.location, e.address, e.date, e.duration,
  e.user_id as "userId", u.name as "userName" from events e
  left join users u on e.user_id = u.uid where u.uid = $1`;

  db.manyOrNone(query, [userId])
    .then((events) => {
      res.json({
        data: events.map(formatEventData)
      });
    }, (err) => {
      res.status(400).json({ data: err });
    });
}

export function getEventsWithUserAttendance(req: any, res: any) {
  const userId = req.params.id;

  const query = `select e.id, e.title, e.description, e.location, e.address, e.date, e.duration,
  e.user_id as "userId", u.name as "userName" from events e
  left join users u on u.uid = e.user_id
  left join attendance a on a.event_id = e.id
  where a.user_id = $1
  order by e.date asc`;

  db.manyOrNone(query, [userId])
    .then((events) => {
      res.json({ data: events.map(formatEventData) });
    }, (err) => {
      res.status(400).json({ data: err })
    });
}

function formatEventData(event: any) {
  event.location = { longitude: event.location.x, latitude: event.location.y };
  event.createdBy = { id: event.userId, name: event.userName };
  delete event.userId;
  delete event.userName;
  return event;
}