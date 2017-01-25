import { Router } from "express"
import * as controllers from "./events.controllers"
import attendanceRoutes from "../attendance"
import { eventImageUpload } from "../middleware/image-upload.middleware"

export const eventRoutes = Router()

eventRoutes
  .get("/", controllers.searchEvents)
  .get("/:id", controllers.getEventDetails)
  .post("/", eventImageUpload.single("event-image"), controllers.createEvent)
  .put("/:id", controllers.updateEvent)
  .delete("/:id", controllers.deleteEvent)

eventRoutes.use("/", attendanceRoutes)