import * as pgp from "pg-promise"
import { db } from "../utilities/db"

export interface IUser {
  uid: string
  name: string
  image?: string
}

export class UserModel {

  pdb: pgp.IDatabase<any>

  constructor(pdb: pgp.IDatabase<any>) {
    this.pdb = pdb
  }

  create(user: IUser) {
    const query = `insert into users(uid, name, image) values ($1, $2, $3)`
    return this.pdb.none(query, [user.uid, user.name, user.image])
  }

  getWithId(uid: string): Promise<IUser> {
    const query = "select * from users where uid = $1"
    return this.pdb.oneOrNone(query, [uid])
  }

  updateDetails(uid: string, details: any) {
    const keys = Object.keys(details)
    const setKeys = keys.map((key, index) => key + " = " + "$" + (index + 1)).join(", ")
    const updateQuery = "update users set " + setKeys + " where uid = $" + (keys.length + 1)
    const values = keys.map((key) => details[key])
    return this.pdb.none(updateQuery, [...values, uid])
  }

  deleteWithId(uid: string) {
    const query = `delete from users where uid = $1`
    return this.pdb.none(query, [uid])
  }
}

export const user = new UserModel(db)