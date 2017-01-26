import { getImageURL, ImageType } from "./image.utilities"

export function formatEventData(event: any) {
  event.longitude = parseFloat(event.location.x)
  event.latitude = parseFloat(event.location.y)
  event.createdBy = { id: event.userId, name: event.userName }
  event.image = !!event.image ? getImageURL(event.image, ImageType.events) : ""
  delete event.userId
  delete event.userName
  delete event.location
  return event
}