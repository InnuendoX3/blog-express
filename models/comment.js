const Datastore = require('nedb');
const db = new Datastore({ filename: './store-comments.db'});
db.loadDatabase(function (err) {});

function findComments(filter = {}) {
  return new Promise( async (resolve, reject) => {
    db.find(filter, (err, docs) => {
      if(err) {
        console.log(err);
        reject(err);
      }
      resolve(docs);
    })
  })
}


function findComment(commentId) {
  return new Promise( async (resolve, reject) => {
    db.findOne({_id: commentId}, (err, doc) => {
      if(err) {
        console.log(err);
        reject(err);
      }
      resolve(doc)
    })
  })
}

function saveComment(comment) {
  return new Promise((resolve, reject) => {
    db.insert(comment, (err, newDoc) => {
      if (err) {
        console.log(err);
        reject(err)
      }
      resolve(newDoc);
    })
  })
}

function deleteComment(id) {
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

function updateComment(id, text, postId, userId) {
  return new Promise(async (resolve, reject) => {
    db.update({ _id : id }, {text, postId, userId}, {}, (err, numReplaced) => {
      if(err) {
        reject(err)
      }
      resolve(numReplaced)
    });
  })
}

module.exports = {
  findComments,
  findComment,
  saveComment,
  deleteComment,
  updateComment
}