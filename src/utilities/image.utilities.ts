import { config } from "../config"

export enum ImageType {
  users, events
}

export function getImageURL(image: string, type: ImageType) {
  const hostName = config.host.host
  const protocol = config.host.protocol

  return `${protocol}://${hostName}/static/images/${ImageType[type]}/${image}`
}