const firebaseAdmin = require('../firebase-admin');

module.exports = function authenticationMiddleware(req, res, next) {
  let authenticationToken = req.get('Authentication');
  let tokenComponents = authenticationToken.split(' ');
  
  if (!authenticationToken || tokenComponents.length != 2) {
    return res.sendStatus(401);
  }
  
  let token = tokenComponents[1];
  
  firebaseAdmin.auth().verifyIdToken(token)
    .then((decodedToken) => {
      req.body.uid = decodedToken.uid;
      next()
    })
    .catch((err) => {
      return res.status(401).send(err);
    });
};