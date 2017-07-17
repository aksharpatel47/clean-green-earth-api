export interface IPlace {
  id: string
  name: string
  address: string
  coordinate: ICoordinate
}

export interface ICoordinate {
  latitude: number
  longitude: number
}