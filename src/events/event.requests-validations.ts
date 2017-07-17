import * as Joi from "joi"
import { IRequestSchema } from "../middleware/schema-validation.middleware"
import { placeSchema } from "../common/common.validators"

export const addEventSchema: IRequestSchema = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().allow(null),
    date: Joi.string().isoDate().required(),
    place: placeSchema.required(),
  })
}