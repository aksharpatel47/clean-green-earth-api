const multer = require('multer');
const path = require('path');
const uuid = require('uuid');

const userStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, req.uid + '-' + Date.now() + '.jpg');
  },
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'images/users'));
  }
});

exports.userImageUpload = multer({ storage: userStorage, limits: { fileSize: '5MB' } });

const eventStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    let eventId = uuid.v4();
    req.body.eventId = eventId;
    cb(null, eventId + '-' + Date.now() + '.jpg');
  }
});

exports.eventImageUpload = multer({ storage: eventStorage, limits: { fileSize: '5MB' } });