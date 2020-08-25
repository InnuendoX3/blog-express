const Datastore = require('nedb');
const db = new Datastore({ filename: './store-posts.db' });
db.loadDatabase(function (err) {});

function findPosts(filter = {}) {
  return new Promise( async (resolve, reject) => {
    db.find(filter, (err, docs) => {
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
    db.findOne({_id: postId}, (err, doc) => {
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
    db.insert(post, (err, newDoc) => {
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
    db.remove({ _id: id }, {}, (err, numRemoved) => {
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
    db.update({ _id : id }, { title, content }, {}, (err, numReplaced) => {
      if(err) {
        reject(err)
      }
      resolve(numReplaced)
    });
  })
}

module.exports = { 
  findPosts,
  findPost,
  savePost,
  deletePost,
  updatePost
};