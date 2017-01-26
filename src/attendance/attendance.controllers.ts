import { db } from "../utilities/db"
import { IAuthenticatedRequest } from "../middleware/firebase-auth.middleware"

export function getAttendees(req: any, res: any) {
  const eventId = req.params.id

  const query = `select u.uid as "userId", u.name as "userName" from users as u
  left join attendance as a on a.user_id = u.uid
  left join events as e on e.id = a.event_id
  where e.id = $1`
  const values = [eventId]

  db.manyOrNone(query, values)
    .then((data) => {
      res.json(data)
    }, (err) => {
      res.status(400).send(err)
    })
}

export function attendEvent(req: IAuthenticatedRequest, res: any) {
  const { uid } = req.user
  const eventId = req.params.id

  const query = `insert into attendance(user_id, event_id) values($1, $2) 
    on conflict(user_id, event_id) do update set updated_on = $3`
  const values = [uid, eventId, new Date()]

  db.none(query, values)
    .then(() => {
      res.json({ data: { message: "success" } })
    }, (err) => {
      res.status(400).json({ data: err })
    })
}

export function removeAttendanceFromEvent(req: IAuthenticatedRequest, res: any) {
  const { uid } = req.user
  const eventId = req.params.id

  const query = `delete from attendance where user_id = $1 and event_id = $2`
  const values = [uid, eventId]

  db.none(query, values)
    .then(() => {
      res.json({ data: { message: "success" } })
    }, (err) => {
      res.status(400).json({ data: err })
    })
}