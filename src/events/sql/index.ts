import { loadSQL } from "../../utilities/db.utilities"

// SQL Files

export const eventsSQL = {
  addEvent: loadSQL(__dirname, "add.event.sql"),
  addPlace: loadSQL(__dirname, "add.place.sql"),
}