import * as pgPromise from "pg-promise"
import { config } from "../config"

export const pgp = pgPromise()

process.on("SIGNINT", () => {
  pgp.end()
})

const { host, port, database, user, password } = config.db

export const db = pgp({ host, port, database, user, password })