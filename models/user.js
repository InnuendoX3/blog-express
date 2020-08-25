const Datastore = require('nedb');
const db = new Datastore({ filename: './store-users.db'});
db.loadDatabase(function (err) {});

function findUsers() {
  return new Promise( async (resolve, reject) => {
    db.find({}, (err, docs) => {
      if(err) {
        console.log(err);
        reject(err);
      }
      resolve(docs)
    })
  })
}

function findUser(userId) {
  return new Promise( async (resolve, reject) => {
    db.findOne({_id: userId}, (err, doc) => {
      if(err) {
        console.log(err);
        reject(err);
      }
      resolve(doc)
    })
  })
}

function saveUser(user) {
  return new Promise(async (resolve, reject) => {
    db.insert(user, (err, newDoc) => {
      if(err) {
        console.log(err);
        reject(err);
      }
      resolve(newDoc);
    })
  })
    
}

function deleteUser(id) {
  return new Promise(async (resolve, reject) => {
    db.remove({ _id: id }, {}, (err, numRemoved) => {
      if(err) {
        console.log(err);
        reject(err);
      }
      resolve(numRemoved);
    });
  })
}

function updateUser(id, username, password) {
  return new Promise(async (resolve, reject) => {
    db.update({ _id : id }, { username, password }, {}, (err, numReplaced) => {
      if(err) {
        reject(err)
      }
      resolve(numReplaced)
    });
  })
}


module.exports = { 
  findUsers,
  findUser,
  saveUser,
  deleteUser,
  updateUser
};