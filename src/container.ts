import { Container } from "inversify"
import { TYPE } from "inversify-express-utils"
import { EventController } from "./events/event.controller"
import { CUSTOM_TYPES } from "./di-types"
import { EventsRepository } from "./events/event.repository"
import { db } from "./db"
import { UserController } from "./users/users.controllers"

export const container = new Container()

container.bind(CUSTOM_TYPES.DB).toConstantValue(db)

container.bind(TYPE.Controller).to(EventController).whenTargetNamed("EventController")
container.bind(CUSTOM_TYPES.EventsRepository).to(EventsRepository).inSingletonScope()

container.bind(TYPE.Controller).to(UserController).whenTargetNamed("UserController")