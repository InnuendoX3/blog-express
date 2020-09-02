const dbComments = require('../database/createDB')
/**
 * {
 *    text:     String
 *    postId:   String
 *    ownerId:  String
 *    _id:      String by NeDB
 * }
*/

function findComments(filter = {}) {
  return new Promise( async (resolve, reject) => {
    dbComments.find(filter, (err, docs) => {
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
    dbComments.findOne({_id: commentId}, (err, doc) => {
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
    dbComments.insert(comment, (err, newDoc) => {
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
    dbComments.remove({ _id: id }, {}, (err, numRemoved) => {
      if(err) {
        console.log(err);
        reject(err);
      }
      resolve(numRemoved);
    });
  })
}

function updateComment(id, text, postId, ownerId) {
  return new Promise(async (resolve, reject) => {
    dbComments.update({ _id : id }, {text, postId, ownerId}, {}, (err, numReplaced) => {
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