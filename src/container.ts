import { Container } from "inversify"
import * as pgp from "pg-promise"
import "reflect-metadata"
import { TYPE } from "inversify-express-utils"
import { UserControllers } from "./users/user.controllers"
import { UserRepository } from "./users/user.repository"
import { db } from "./utilities/db"
import { CUSTOM_TYPES } from "./dependency-constants"

export const container = new Container()
container.bind(TYPE.Controller).to(UserControllers).whenTargetNamed(CUSTOM_TYPES.UserControllers)
container.bind(CUSTOM_TYPES.UserRepository).to(UserRepository)
container.bind(CUSTOM_TYPES.PDB).toConstantValue(db)