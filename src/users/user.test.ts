import { expect } from "chai"
import { UserModel, IUser } from "./user.model"
import { db } from "../utilities/db"
import * as request from "supertest"
import { app } from "../app"

describe("User Module", function () {
  const user: IUser = { uid: "new-user-id", name: "Anonymous", image: undefined }
  const userModel: UserModel = new UserModel(db)

  describe("User Model", function () {

    before(function (done) {
      userModel.deleteWithId(user.uid)
        .then(done, done)
    })

    it("should allow creating a new user", function (done) {
      userModel.create(user)
        .then(() => {
          done()
        }, (err) => {
          done(err)
        })
    })

    it("should get user details based on id", function (done) {
      userModel.getWithId(user.uid)
        .then((data) => {
          expect(data).to.exist
          done()
        }, (err) => {
          done(err)
        })
    })

    it("should update user name", function (done) {
      const newUserName = "Anon"
      userModel.updateDetails(user.uid, { name: newUserName })
        .then(() => userModel.getWithId(user.uid))
        .then((data) => {
          expect(data.name).to.equal(newUserName)
          done()
        }, (err) => {
          done(err)
        })
    })

    it("should update user image", function (done) {
      const newImageName = "image.jpg"
      userModel.updateDetails(user.uid, { image: newImageName })
        .then(() => userModel.getWithId(user.uid))
        .then((data) => {
          expect(data.image).to.equal(newImageName)
          done()
        }, (err) => {
          done(err)
        })
    })

    it("delete a user", function (done) {
      userModel.deleteWithId(user.uid)
        .then(done, done)
    })
  })

  describe("User Routes", function () {

    const authHeader = `Bearer ${process.env.FIREBASE_TOKEN}`

    before(function (done) {
      userModel.deleteWithId(user.uid)
        .then(done, done)
    })

    it("should respond with 401 if api used without auth token", function (done) {
      request(app)
        .get("/users")
        .set("accept", "application/json")
        .expect(401, done)
    })

    it("should get user details with request is authorized", function (done) {
      request(app)
        .get("/users")
        .set("Authorization", authHeader)
        .expect(200)
        .end(done)
    })
  })
})