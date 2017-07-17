import * as pgp from "pg-promise"
import { dbConfig } from "./config/db.config"

export const pgPro = pgp()
export const db = pgPro(dbConfig)