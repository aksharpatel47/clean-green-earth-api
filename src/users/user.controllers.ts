import "reflect-metadata"
import { Response } from "express"
import { inject, injectable } from "inversify"
import { Controller, Get, Patch, Post } from "inversify-express-utils"
import { CUSTOM_TYPES } from "../dependency-constants"
import { IAuthenticatedRequest } from "../middleware/firebase-auth.middleware"
import { NotFoundError } from "../utilities/errors/not-found.error"
import { NotImplementedError } from "../utilities/errors/not-implemented.error"
import { UserRepository } from "./user.repository"
import { ICreateUserRequest, IGetUserDetailsRequest, IPatchUserDetailsRequest } from "./user.schemas"

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
  @Patch("/")
  async patchUserDetails(req: IPatchUserDetailsRequest, res: Response) {
    const { uid } = req.user
    const { name } = req.body

    let updatePromise: Promise<any> | undefined

    if (name) {
      updatePromise = this.userRepository.update(uid, { name })
    } else if (req.file) {
      updatePromise = this.userRepository.update(uid, { image: req.file.filename })
    } else {
      return { data: { message: "No data to update" } }
    }

    await updatePromise

    return { data: { message: "Updated." } }
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
      throw new NotFoundError(`User with ID:${req.params.id} does not exist.`)
    }

    return { data: { user } }
  }
}