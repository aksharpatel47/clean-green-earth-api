console.time('insert');
const db = require('./db');
const faker = require('faker');
const uuid = require('uuid');

function createEventData(uid) {
  return {
    id: uuid.v4(),
    title: faker.random.words(5).slice(0, 50),
    description: faker.lorem.paragraphs().slice(0, 1000),
    location: `(${faker.address.longitude()},${faker.address.latitude()})`,
    date: faker.date.future(),
    duration: (faker.random.number(18) + 2) * 15,
    uid
  }
}

function createUserData() {
  return {
    uid: faker.random.uuid(),
    name: faker.name.findName()
  }
}

let errors = [];
let processedCount = 0;

function insertEventIntoDb(event, totalCount) {
  const query = 'insert into events(id, title, description, location, date, duration, user_id) values' +
    '(${id}, ${title}, ${description}, ${location}, ${date}, ${duration}, ${uid})';

  db.none(query, event)
    .then(() => {
      processedCount += 1;
      checkCompletion(totalCount);
    }, (err) => {
      errors.push(event);
      processedCount += 1;
      checkCompletion(totalCount);
    })
}

function insertUserIntoDb(user, totalCount) {
  const query = 'insert into users(uid, name) values (${uid}, ${name})';

  db.none(query, user)
    .then(() => {
      processedCount += 1;
      checkCompletion(totalCount);
    }, (err) => {
      errors.push(user);
      processedCount += 1;
      checkCompletion(totalCount);
    });
}

function checkCompletion(totalCount) {
  if (processedCount === totalCount) {
    console.log(`Finished inserting objects into the db. Error in ${errors.length} objects.`);
    console.timeEnd('insert');
  }
}

function getAllUsersFromDB() {
  const query = 'select uid from users';

  return db.many(query)
    .then((data) => data.map((row) => row.uid))
}

function insertEventsIntoDb(totalCount) {
  getAllUsersFromDB()
    .then((uids) => {
      for (let i = 0; i < totalCount; i++) {
        insertEventIntoDb(createEventData(uids[faker.random.number(uids.length - 1)]), totalCount)
      }
    });
}

function insertUsersIntoDb(count) {
  for (let i = 0; i < count; i++) {
    insertUserIntoDb(createUserData(), count);
  }
}

function getEventIdsFromDb() {
  const query = 'select id, user_id as "userId" from events';

  return db.many(query)
}

function insertAttendeeIntoDb(event, uid) {

  const query = 'insert into attendance(user_id, event_id) values ($1, $2)';
  return db.none(query, [uid, event.id])
    .then(() => {

    }, (err) => {
      errors.push({event, uid})
    })
}

function getRandomValuesFromArray(arr, count) {
  let randomValues = [];

  for (let i = 0; i < count; i++) {
    let index = Math.floor(Math.random() * arr.length);
    randomValues.push(arr[index])
  }

  return randomValues;
}

function insertAttendanceIntoDb() {
  let promises = [getEventIdsFromDb(), getAllUsersFromDB()];
  console.log('Starting Attendance');
  Promise.all(promises)
    .then((results) => {
      console.log(results.length);
      let events = results[0];
      console.log(events.length);
      let uids = results[1];
      console.log(uids.splice(0, 10));
      events.forEach((event) => {
        let eventAttendees = getRandomValuesFromArray(uids, 2);

        Promise.all(eventAttendees.map((usr) => {
          return insertAttendeeIntoDb(event, usr);
        })).then(() => {
          processedCount += 1;
          checkCompletion(events.length);
        }, (err) => {
          processedCount += 1;
          checkCompletion(events.length);
        })
      })
    })
}