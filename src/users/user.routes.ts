import { Router } from "express"
import * as userControllers from "./user.controllers"
import { userImageUpload } from "../middleware/image-upload.middleware"

export const userRoutes = Router()

userRoutes
  .route("/")
  .get(userControllers.getUserDetails)
  .post(userImageUpload.single("user-image"), userControllers.createUser)
  .patch(userImageUpload.single("user-image"), userControllers.patchUserDetails)

userRoutes
  .get("/events", userControllers.getUserEvents)
  .get("/:id", userControllers.getUserDetails)
  .get("/:id/events", userControllers.getUserEvents)
  .get("/:id/attendance", userControllers.getEventsWithUserAttendance)