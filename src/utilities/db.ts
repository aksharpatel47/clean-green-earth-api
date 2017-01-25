import * as pgp from "pg-promise"
import { config } from "../config"

const { host, port, database, user, password } = config.db

export const db = pgp()({ host, port, database, user, password })