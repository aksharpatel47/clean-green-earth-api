import { IPlace } from "../common/common"

interface IAddEventDetails {
  title: string
  description?: string
  date: string
  place: IPlace
}

interface IEventKeys {
  title?: string
  date?: string
  page?: number
  user?: string
}

interface IEventID {
  id: string
}

export interface IEventsRepository {
  add(data: IAddEventDetails, userID: string): Promise<IEventID>
  findByID(id: string): Promise<IAddEventDetails>
  updateByID(id: string, updatedData: IAddEventDetails): Promise<void>
  find(keys: IEventKeys): Promise<IAddEventDetails[]>
  deleteByID(id: string): Promise<IEventID>
}