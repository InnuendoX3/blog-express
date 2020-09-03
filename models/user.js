const { dbUsers } = require('../database/createDB')
const bcryptjs = require('bcryptjs');

/**
 * {
 *    username: String
 *    password: String
 *    role:     String (Admin, User)
 *    _id:      String by NeDB
 * }
*/

function findUsers() {
  return new Promise( async (resolve, reject) => {
    dbUsers.find({}, (err, docs) => {
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
    dbUsers.findOne({_id: userId}, (err, doc) => {
      if(err) {
        console.log(err);
        reject(err);
      }
      resolve(doc)
    })
  })
}


function saveUser(user) {
  return new Promise((resolve, reject) => {
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(user.password, salt);
    let hashedUser = {
      username: user.username,
      password: hash,
      role: user.role
    };
    dbUsers.insert(hashedUser, (err, newDoc) => {
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
    dbUsers.remove({ _id: id }, {}, (err, numRemoved) => {
      if(err) {
        console.log(err);
        reject(err);
      }
      resolve(numRemoved);
    });
  })
}

function updateUser(id, username, password, role) {
  return new Promise(async (resolve, reject) => {
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(password, salt);
    dbUsers.update({ _id : id }, { username, password: hash, role }, {}, (err, numReplaced) => {
      if(err) {
        reject(err)
      }
      resolve(numReplaced)
    });
  })
}

function loginUser(user) {
  return new Promise(async (resolve, reject) => {
    dbUsers.findOne({username: user.username}, (err, doc) => {
      if(!doc) return reject('User does not exist')
      if(err) {
        console.log(err);
        reject(err);
      } else {
        const response = bcryptjs.compareSync(user.password, doc.password) 
        if (response) {
          resolve(doc)
        }else {
          reject(response)
        }
      }
    })
  })
}

function countUsers() {
  return new Promise((resolve, reject) => {
    dbUsers.count({}, (err, qtyUsers) => {
      if(err) return reject(err)
      resolve(qtyUsers)
    })
  })
}


function clearDatabase() {
  dbUsers.remove({}, {multi: true})
}

module.exports = { 
  findUsers,
  findUser,
  saveUser,
  deleteUser,
  updateUser,
  loginUser,
  countUsers,
  clearDatabase
};