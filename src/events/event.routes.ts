import { Router } from "express"
import * as controllers from "./event.controllers"
import attendanceRoutes from "../attendance"
import { eventImageUpload } from "../middleware/image-upload.middleware"
import { validate } from "../middleware/schema-validation.middleware"
import { searchEventsSchema } from "./event.schemas"

export const eventRoutes = Router()

eventRoutes
  .get("/", validate(searchEventsSchema), controllers.searchEvents)
  .get("/:id", controllers.getEventDetails)
  .post("/", eventImageUpload.single("event-image"), controllers.createEvent)
  .put("/:id", controllers.updateEvent)
  .delete("/:id", controllers.deleteEvent)

eventRoutes.use("/", attendanceRoutes)