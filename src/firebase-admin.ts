import * as admin from "firebase-admin"
import * as path from "path"

const serviceKeyPath = path.resolve(__dirname, "../serviceAccountKey.json")
const serviceAccountKey = require(serviceKeyPath)

export const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: "https://clean-green-earth-62497.firebaseio.com/"
})