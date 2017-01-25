import * as multer from "multer"
import * as path from "path"
import * as uuid from "uuid"

const userStorage = multer.diskStorage({
  filename: (req: any, file, cb) => {
    cb(undefined, req.user.uid + "-" + Date.now() + ".jpg")
  },
  destination: (req, file, cb) => {
    cb(undefined, path.join(__dirname, "../../images/users"))
  }
})

export const userImageUpload = multer({ storage: userStorage })

const eventStorage = multer.diskStorage({
  filename: (req: any, file, cb) => {
    const eventId = req.params.id || uuid.v4()
    req.body.eventId = eventId
    cb(undefined, eventId + "-" + Date.now() + ".jpg")
  },
  destination: (req, file, cb) => {
    cb(undefined, path.join(__dirname, "../../images/events"))
  }
})

export const eventImageUpload = multer({ storage: eventStorage })