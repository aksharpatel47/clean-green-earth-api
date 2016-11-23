const db = require('../db');

exports.createAccount = function createAccount(req, res) {
  const { uid } = req.body;
  
  const query = 'insert into users(uid) values ($1)';
  
  db.none(query, [uid])
    .then(() => {
      res.status(201).send({data: 'created'});
    }, (err) => {
      res.status(400).send({data: err});
    });
};

exports.updateAccount = function updateAccount(req, res) {
  const { uid, name } = req.body;

  const query = 'update users set name = $1, updated_on = $2 where uid = $3';

  db.none(query, [name, new Date(), uid])
    .then(() => {
      res.status(200).send({data: 'success'});
    }, (err) => {
      res.status(400).send({data: err});
    });
};

exports.getAccountDetails = function getAccountDetails(req, res) {
  const { uid } = req.body;
  
  const query = 'select u.uid as "userId", u.name as "userName" from users u where uid = $1';
  
  db.one(query, [uid])
    .then((data) => {
      res.json({data});
    }, (err) => {
      res.status(400).send({data: err});
    })
};