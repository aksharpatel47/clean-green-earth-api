import * as admin from 'firebase-admin';
import { readFileSync } from 'fs';
import * as path from 'path';

const serviceAccountKey = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: 'https://clean-green-earth-62497.firebaseio.com/'
});

export default admin;