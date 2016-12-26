import * as multer from 'multer';
import * as path from 'path';
import * as uuid from 'uuid';

const userStorage = multer.diskStorage({
  filename: (req: any, file, cb) => {
    cb(null, req.body.uid + '-' + Date.now() + '.jpg');
  },
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'images/users'));
  }
});

export const userImageUpload = multer({ storage: userStorage, limits: { fileSize: 5120 } });

const eventStorage = multer.diskStorage({
  filename: (req: any, file, cb) => {
    let eventId = req.params.id || uuid.v4();
    req.body.eventId = eventId;
    cb(null, eventId + '-' + Date.now() + '.jpg');
  }
});

export const eventImageUpload = multer({ storage: eventStorage, limits: { fileSize: 5120 } });