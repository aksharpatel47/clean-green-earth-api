import * as Joi from "joi"

export const coordinateSchema = Joi.object().keys({
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
})

export const placeSchema = Joi.object().keys({
  id: Joi.string().required(),
  name: Joi.string().required(),
  address: Joi.string().required(),
  coordinate: coordinateSchema.required(),
})