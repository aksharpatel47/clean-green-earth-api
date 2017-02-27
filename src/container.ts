import "reflect-metadata"
import { Container } from "inversify"
import { TYPE } from "inversify-express-utils"
import { CUSTOM_TYPES } from "./dependency-constants"
import { UserControllers } from "./users/user.controllers"
import { UserRepository } from "./users/user.repository"
import { db, pgp } from "./utilities/db"

export const container = new Container()
container.bind(TYPE.Controller).to(UserControllers).whenTargetNamed(CUSTOM_TYPES.UserControllers)
container.bind(CUSTOM_TYPES.UserRepository).to(UserRepository)
container.bind(CUSTOM_TYPES.PDB).toConstantValue(db)
container.bind(CUSTOM_TYPES.PGP).toConstantValue(pgp)