const { dbPosts } = require('../database/createDB')
const userModel = require('../models/user')
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

function deletePost(queryFilter) {
  return new Promise(async (resolve, reject) => {
    dbPosts.remove(queryFilter, {}, (err, numRemoved) => {
      if(err) {
        console.log(err);
        reject(err);
      }
      resolve(numRemoved);
    });
  })
}

function updatePost(queryFilter, title, content) {
  return new Promise(async (resolve, reject) => {
    dbPosts.update(queryFilter, { $set: {title, content} }, {}, (err, numReplaced) => {
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

//TODO
function postOwner(postId) {
  return new Promise( async (resolve, reject) => {
    try {
      const post = await findPost(postId)
      const user = await userModel.findUser(post.ownerId)
      resolve(user)
    } catch (error) {
      reject(error)
    }
  })
}

function clearDatabase() {
  dbPosts.remove({}, {multi: true})
}

module.exports = { 
  findPosts,
  findPost,
  savePost,
  deletePost,
  updatePost,
  countPosts,
  postOwner,
  clearDatabase
};