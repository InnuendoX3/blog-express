const { dbPosts } = require('../database/createDB')
/**
 * {
 *    title:    String
 *    content:  String
 *    ownerId:  String
 *    _id:      String by NeDB
 * }
*/

function findPosts(filter) {
  return new Promise( async (resolve, reject) => {
    dbPosts.find(filter, (err, docs) => {
      if(err) {
        console.log(err);
        reject(err);
      }
      resolve(docs)
    })
  })
}

function findPost(postId) {
  return new Promise( async (resolve, reject) => {
    dbPosts.findOne({_id: postId}, (err, doc) => {
      if(err) {
        console.log(err);
        reject(err);
      }
      resolve(doc)
    })
  })
}

function savePost(post) {
  return new Promise(async (resolve, reject) => {
    dbPosts.insert(post, (err, newDoc) => {
      if(err) {
        console.log(err);
        reject(err);
      }
      resolve(newDoc);
    })
  })
    
}

function deletePost(id) {
  return new Promise(async (resolve, reject) => {
    dbPosts.remove({ _id: id }, {}, (err, numRemoved) => {
      if(err) {
        console.log(err);
        reject(err);
      }
      resolve(numRemoved);
    });
  })
}

function updatePost(id, title, content) {
  return new Promise(async (resolve, reject) => {
    dbPosts.update({ _id : id }, { title, content }, {}, (err, numReplaced) => {
      if(err) {
        reject(err)
      }
      resolve(numReplaced)
    });
  })
}

function countPosts() {
  return new Promise(async (resolve, reject) => {
    dbPosts.count({}, (err, numberPosts) => {
      if(err) {
        reject(err)
      }
      resolve(numberPosts)
    })
  })
}

module.exports = { 
  findPosts,
  findPost,
  savePost,
  deletePost,
  updatePost,
  countPosts
};