import { inject, injectable } from "inversify"
import { IDatabase, TQueryFormat } from "pg-promise"
import { pgPro } from "../db"
import { CUSTOM_TYPES } from "../di-types"
import { IAddEventDetails, IEventID, IEventKeys, IEventsRepository } from "./event"
import { eventsSQL } from "./sql/index"

@injectable()
export class EventsRepository implements IEventsRepository {

  constructor(@inject(CUSTOM_TYPES.DB) private db: IDatabase<any>) {
  }

  findByID(id: string): Promise<IAddEventDetails> {
    throw new Error("Method not implemented.")
  }

  updateByID(id: string, updatedData: IAddEventDetails): Promise<void> {
    throw new Error("Method not implemented.")
  }

  find(keys: IEventKeys): Promise<IAddEventDetails[]> {
    throw new Error("Method not implemented.")
  }

  deleteByID(id: string): Promise<IEventID> {
    throw new Error("Method not implemented.")
  }

  add(data: IAddEventDetails, userID: string): Promise<IEventID> {
    const { place } = data
    const queries: TQueryFormat[] = [
      { query: eventsSQL.addEvent, values: [data.title, data.description, data.date, userID] },
      {
        query: eventsSQL.addPlace,
        values: [place.id, place.name, place.address, `(${place.coordinate.longitude},${place.coordinate.latitude})`],
      },
    ]
    return this.db.tx("add-event", (t) => {
      return t.none(pgPro.helpers.concat(queries))
    })
  }
}