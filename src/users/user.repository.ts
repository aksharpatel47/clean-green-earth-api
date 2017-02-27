import "reflect-metadata"
import { inject, injectable } from "inversify"
import * as pgp from "pg-promise"
import { CUSTOM_TYPES } from "../dependency-constants"

export interface IUser {
  uid: string
  name: string
  image?: string
}

interface IStringDictionary {
  [key: string]: string
}

@injectable()
export class UserRepository {

  constructor( @inject(CUSTOM_TYPES.PDB) private pdb: pgp.IDatabase<any>) { }

  add(user: IUser) {
    const query = `insert into users(uid, name, image) values ($1, $2, $3)`
    return this.pdb.none(query, [user.uid, user.name, user.image])
  }

  getWithId(uid: string): Promise<IUser> {
    const query = "select * from users where uid = $1"
    return this.pdb.oneOrNone(query, [uid])
  }

  update(uid: string, details: IStringDictionary) {
    const keys = Object.keys(details)
    const setKeys = keys.map((key, index) => key + " = " + "$" + (index + 1)).join(", ")
    const updateQuery = "update users set " + setKeys + " where uid = $" + (keys.length + 1)
    const values = keys.map((key) => details[key])
    return this.pdb.none(updateQuery, [...values, uid])
  }
}