import { db } from "../utilities/db"
import { Request, Response } from "express"
import {
  ICreateUserRequest,
  IGetUserDetailsRequest,
  IPatchUserDetailsRequest,
  IGetUserEventsRequest
} from "./user.schemas"
import { user } from "./user.model"
import { getImageURL, ImageType } from "../utilities/image.utilities"

/**
 * Creates user on the server. This is called after firebase creates
 * the user at their server.
 * @param req
 * @param res
 */
export function createUser(req: ICreateUserRequest, res: Response) {
  const { uid, name } = req.user
  let image = ""

  if (req.file) {
    image = req.file.filename
  }

  user.create({ uid, name, image })
    .then(() => res.status(201).json({ data: { message: "Created" } }))
    .catch((error) => {
      // TODO: Log Error
      console.error("createUser: ", error)
      res.status(400).json({
        error: {
          description: "Error while creating user.",
          details: [{ path: "postgres", message: error.message }]
        }
      })
    })
}

/**
 *
 * @param req
 * @param res
 */
export function patchUserDetails(req: IPatchUserDetailsRequest, res: Response) {
  const { uid } = req.user
  const { name } = req.body

  let updatePromise: Promise<any> | undefined

  if (name) {
    updatePromise = user.updateDetails(uid, { name })
  } else if (req.file) {
    updatePromise = user.updateDetails(uid, { image: req.file.filename })
  }

  if (updatePromise) {
    return updatePromise
      .then(() => res.status(200).send({ data: { message: "User details updated." } }))
      .catch((error) => {
        // TODO: Log Error
        console.error("patchUserDetails: ", error)
        res.status(400).send({
          error: {
            description: "Error while updating user details.",
            details: [{ path: "postgres", message: error.message }]
          }
        })
      })
  }

  res.status(400).send({ error: { description: "No details sent to update.", details: [] } })
}

/**
 * getUserDetails method gets the details of the user having the id
 * sent in the parameters. If the user does not exist, respond with
 * 404, else respond with the user details.
 * @param req
 * @param res
 */
export function getUserDetails(req: IGetUserDetailsRequest, res: Response) {
  const uid = req.user.uid as string
  const userId = req.params.id as string || uid

  user.getWithId(userId)
    .then((userData) => {
      if (!userData) {
        return res.status(404).json({ error: { description: "No such user found." } })
      }

      res.json({ data: { user: Object.assign(userData, { image: getImageURL(userData.image, ImageType.users) }) } })
    }, (err) => {
      // TODO: Log Error
      res.status(400).json({
        error: {
          description: "Error while getting user Details.",
          details: [{ path: "db", message: err.message }]
        }
      })
    })
}

export function getUserEvents(req: IGetUserEventsRequest, res: Response) {
  const { uid } = req.user
  const userId = req.params.id || uid

  const userEventsQuery = `
    select e.id, e.image, e.title, e.description, e.location, e.address, e.date, e.duration,
    e.user_id as "userId", u.name as "userName" from events e
    left join users u on e.user_id = u.uid where u.uid = $1
  `
  const userAttendingEventsQuery = `
    select e.id, e.image, e.title, e.description, e.location, e.address, e.date, e.duration,
      e.user_id as "userId", u.name as "userName" from events e
      left join users u on u.uid = e.user_id
      left join attendance a on a.event_id = e.id
      where a.user_id = $1
  `

  Promise.all([
    db.manyOrNone(userEventsQuery, [userId]),
    db.manyOrNone(userAttendingEventsQuery, [userId])
  ]).then((data) => {
    const events = data.reduce((events, arr) => events.concat(arr), []).sort((ev1, ev2) => ev1.date - ev2.date).map(event => formatEventData(event))
    res.json({ data: { events } })
  })
    .catch((err) => {
      console.error("getUserEvents: ", userId, err)
      res.status(400).json({
        error: {
          description: "Error while getting user events.",
          details: [{ path: "postgres", message: err.message }]
        }
      })
    })
}

export function getEventsWithUserAttendance(req: Request, res: Response) {
  const userId = req.params.id

  const userAttendingEventsQuery = `select e.id, e.title, e.description, e.location, e.address, e.date, e.duration,
  e.user_id as "userId", u.name as "userName" from events e
  left join users u on u.uid = e.user_id
  left join attendance a on a.event_id = e.id
  where a.user_id = $1
  order by e.date asc`

  db.manyOrNone(userAttendingEventsQuery, [userId])
    .then((events) => {
      res.json({ data: events.map(formatEventData) })
    }, (err) => {
      res.status(400).json({ data: err })
    })
}

function formatEventData(event: any) {
  event.longitude = parseFloat(event.location.x)
  event.latitude = parseFloat(event.location.y)
  event.createdBy = { id: event.userId, name: event.userName }
  event.image = !!event.image ? getImageURL(event.image, ImageType.events) : ""
  delete event.userId
  delete event.userName
  delete event.location
  return event
}