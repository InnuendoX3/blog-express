const Datastore = require('nedb');
const db = new Datastore({ filename: './database.db' });
db.loadDatabase(function (err) {});

function savePost(post) {
  return new Promise(async (resolve, reject) => {
    db.insert(post, (err, newDoc) => {
      if(err) {
        reject(err)
      }
      resolve(newDoc)
    })
  })
    
}

function deletePost(id) {
  return new Promise(async (resolve, reject) => {
    db.remove({ _id: id }, {}, (err, numRemoved) => {
      if(err) {
        reject(err)
      }
      resolve(numRemoved)
    });
  })
}

function updatePost(id, title, content) {
  return new Promise(async (resolve, reject) => {
    db.update({ _id : id }, { title : title, content : content }, {}, (err, numReplaced) => {
      if(err) {
        reject(err)
      }
      resolve(numReplaced)
    });
  })
}

module.exports = { savePost, deletePost, updatePost };