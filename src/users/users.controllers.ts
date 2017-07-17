import { injectable } from "inversify"
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils"


@injectable()
@controller("/users")
export class UserController {
  constructor() {
  }

  @httpGet("/")
  searchUsers() {
    // TODO
  }

  @httpGet("/:userID")
  getUserDetails() {
    // TODO
  }

  @httpPost("/")
  addNewPost() {
    // TODO
  }

  @httpPut("/")
  patchUserDetails() {
    // TODO
  }

  @httpDelete("/")
  deleteAccount() {
    // TODO
  }
}