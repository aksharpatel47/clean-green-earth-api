import "reflect-metadata"
import { Response } from "express"
import { inject, injectable } from "inversify"
import { Controller, Get, Patch, Post } from "inversify-express-utils"
import { CUSTOM_TYPES } from "../dependency-constants"
import { IAuthenticatedRequest } from "../middleware/firebase-auth.middleware"
import { validate } from "../middleware/schema-validation.middleware"
import { NotImplementedError } from "../utilities/errors/not-implemented.error"
import { UserRepository } from "./user.repository"
import {
  ICreateUserRequest,
  IGetUserDetailsRequest,
  IPatchUserDetailsRequest,
  patchUserDetailSchema
} from "./user.schemas"

@Controller("/users")
@injectable()
export class UserControllers {

  constructor(@inject(CUSTOM_TYPES.UserRepository) private userRepository: UserRepository) {
  }

  /**
   * This function creates a new user.
   * @param req
   * @returns {Promise<{data: {message: string}}>}
   */
  @Post("/")
  async createUser(req: ICreateUserRequest) {
    const { uid, name } = req.user
    let image = ""

    if (req.file) {
      image = req.file.filename
    }

    await this.userRepository.add({ uid, name, image })

    return { data: { message: "Created" } }
  }

  /**
   * Update details of the user.
   * @param req
   * @param res
   */
  @Patch("/", validate(patchUserDetailSchema))
  async patchUserDetails(req: IPatchUserDetailsRequest, res: Response) {
    const { uid } = req.user
    const { key, value } = req.body

    if (key === "name" && value) {
      await this.userRepository.update(uid, { name: value })
    } else if (key === "image" && req.file) {
      await this.userRepository.update(uid, { image: req.file.filename })
    } else {
      return res.status(400).json({ error: { message: "No data to update." } })
    }

    return { data: { message: "Updated" } }
  }

  @Get("/")
  searchUsers(req: IAuthenticatedRequest) {
    throw new NotImplementedError("API yet to be implemented.")
  }

  /**
   * Get details of the user, along with the events the user has
   * created and the events the user is attending
   * @param req
   * @param res
   */
  @Get("/:id")
  async getUserDetails(req: IGetUserDetailsRequest, res: Response) {

    const user = await this.userRepository.getWithId(req.params.id)

    if (!user) {
      return res.status(404).json({ error: { message: `User with ID:${req.params.id} does not exist.` } })
    }

    return { data: { user } }
  }
}