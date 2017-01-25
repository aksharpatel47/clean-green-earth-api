import * as Joi from "joi"
import { Request, Response } from "express"
import { IAuthenticatedRequest } from "./firebase-auth.middleware"

export interface IRequestSchema {
  body?: Joi.ObjectSchema
  params?: Joi.ObjectSchema
  query?: Joi.ObjectSchema
  user?: Joi.ObjectSchema
}

export function validate(schema: IRequestSchema): (req: Request, res: Response, next: any) => void {
  return (req: IAuthenticatedRequest, res: Response, next: any) => {
    const promises: Promise<any>[] = []
    const keysValidated: string[] = []

    if (schema.body) {
      promises.push(validateWithPromise(req.body, schema.body))
      keysValidated.push("body")
    }

    if (schema.params) {
      promises.push(validateWithPromise(req.params, schema.params))
      keysValidated.push("params")
    }

    if (schema.query) {
      promises.push(validateWithPromise(req.query, schema.query))
      keysValidated.push("query")
    }

    if (schema.user) {
      promises.push(validateWithPromise(req.user, schema.user))
      keysValidated.push("user")
    }

    Promise.all(promises)
      .then((validDataArray) => {
        keysValidated.forEach((key, index) => {
          req[key] = validDataArray[index]
        })

        next()
      }, (err) => {
        const details = err.details.map(detail => ({ path: detail.path, message: detail.message }))
        res.status(422).json({ error: { description: "Request contains invalid or missing details.", details } })
      })
  }
}

function validateWithPromise(data: any, schema: Joi.ObjectSchema) {
  return new Promise((resolve, reject) => {
    Joi.validate(data, schema, { abortEarly: false, allowUnknown: true }, (err, value) => {
      if (err) {
        return reject(err)
      }

      resolve(value)
    })
  })
}