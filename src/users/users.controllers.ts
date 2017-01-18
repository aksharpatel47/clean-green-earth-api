import db from '../db';
import { Request, Response } from 'express';
import { ICreateUserRequest } from './user.schemas';

/**
 * Creates user on the server. This is called after firebase creates
 * the user at their server.
 * @param req
 * @param res
 */
export function createUser(req: ICreateUserRequest, res: Response) {
  const { name, photoURL } = req.body;
  const { uid } = req.user;
  const query = `insert into users(uid, name, image) values ($1, $2, $3)`;

  db.none(query, [ uid, name, photoURL ])
    .then(() => res.status(201).json({ data: { message: 'Created.' } }))
    .catch((error) => res.status(400).json({ data: { error } }));
}

async function addUserToDb(uid: string, name: string, photoURL: string) {
  const query = `insert into users(uid, name, image) values ($1, $2, $3)`;
  await db.none(query, [ uid, name, photoURL ]);
}

export function updateUserDetails(req: Request, res: Response) {
  const { uid, name } = req.body;

  const query = `update users set name = $1, updated_on = $2 where uid = $3`;

  db.none(query, [ name, new Date(), uid ])
    .then(() => res.status(200).send({ data: { message: 'Updated.' } }))
    .catch((error) => res.status(400).send({ data: { error } }));
}

/**
 *
 * @param req
 * @param res
 */
export function patchUserDetails(req: Request, res: Response) {
  const { uid, name } = req.body;

  const query = 'update users set image = $1, updated_on = $2 where uid = $3';

  if (!req.file) {
    return res.status(400).json({ data: { message: 'No image to update.' } });
  }

  const filename = req.file.filename;

  db.none(query, [ filename, new Date(), uid ])
    .then(() => res.status(200).send({ data: { message: 'success' } }))
    .catch((err) => res.status(400).send({ data: err }));
}

/**
 * getUserDetails method gets the details of the user having the id
 * sent in the parameters. If the user does not exist, respond with
 * 404, else respond with the user details.
 * @param req
 * @param res
 */
export function getUserDetails(req: Request, res: Response) {
  const uid = req.body.uid as string;
  const userId = req.params.id as string || uid;

  const query = `select u.uid as "id", u.name from users u where uid = $1`;

  db.any(query, [ userId ])
    .then((data) => {

      const user = data[ 0 ] || undefined;

      if (user) {
        return res.json({ data: user });
      }

      res.status(404).json({ data: { message: `No user found with the id ${userId}` } });

    }, (err) => {
      res.status(400).send({ data: err });
    });
}

export function getUserEvents(req: Request, res: Response) {
  const userId = req.params.id;

  const query = `select e.id, e.title, e.description, e.location, e.address, e.date, e.duration,
  e.user_id as "userId", u.name as "userName" from events e
  left join users u on e.user_id = u.uid where u.uid = $1`;

  db.manyOrNone(query, [ userId ])
    .then((events) => {
      res.json({
        data: events.map(formatEventData)
      });
    }, (err) => {
      res.status(400).json({ data: err });
    });
}

export function getEventsWithUserAttendance(req: Request, res: Response) {
  const userId = req.params.id;

  const query = `select e.id, e.title, e.description, e.location, e.address, e.date, e.duration,
  e.user_id as "userId", u.name as "userName" from events e
  left join users u on u.uid = e.user_id
  left join attendance a on a.event_id = e.id
  where a.user_id = $1
  order by e.date asc`;

  db.manyOrNone(query, [ userId ])
    .then((events) => {
      res.json({ data: events.map(formatEventData) });
    }, (err) => {
      res.status(400).json({ data: err });
    });
}

function formatEventData(event: any) {
  event.location = { longitude: event.location.x, latitude: event.location.y };
  event.createdBy = { id: event.userId, name: event.userName };
  delete event.userId;
  delete event.userName;
  return event;
}