import { NextFunction, Response } from "express"
import { inject } from "inversify"
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils"
import { CUSTOM_TYPES } from "../di-types"
import { IEventsRepository } from "./event"
import { ICreateEventRequest } from "./event.requests-definitions"

@controller("/events")
export class EventController {
  constructor(@inject(CUSTOM_TYPES.EventsRepository) private eventsRepo: IEventsRepository) {
  }

  @httpPost("/")
  addEvent(req: ICreateEventRequest, res: Response, next: NextFunction) {
    const { date, description, title, place } = req.body
    const { uid } = req.user
    return this.eventsRepo.add({ title, description, date, place }, uid)
      .then((data) => res.sendStatus(201), next)
  }

  /**
   * Use cases
   * - Get user's events
   * - Search all events
   */
  @httpGet("/")
  getEvents() {
    // TODO:
  }

  @httpGet("/:id")
  getEventDetails() {
    // TODO:
  }

  @httpPut("/:id")
  updateEvent() {
    // TODO:
  }

  @httpDelete("/:id")
  deleteEvent() {
    // TODO:
  }
}