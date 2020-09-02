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

function adminFindUser(userId) {
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

function userFindUser(userId) {
  return new Promise( async (resolve, reject) => {
    dbUsers.findOne({_id: userId}, (err, doc) => {
      if(err) {
        console.log(err);
        reject(err);
      } else {
        if(doc._id == userId) {
          resolve(doc)
        } else {
          reject("You can only view your own profile")
        }
      }
    })
  })
}

function saveUser(user) {
  return new Promise(async (resolve, reject) => {
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
    dbUsers.update({ _id : id }, { username, password, role }, {}, (err, numReplaced) => {
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


module.exports = { 
  findUsers,
  adminFindUser,
  userFindUser,
  saveUser,
  deleteUser,
  updateUser,
  loginUser
};