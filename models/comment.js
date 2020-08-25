const Datastore = require('nedb');
const db = new Datastore({ filename: './store-comments.db'});
db.loadDatabase(function (err) {});

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

module.exports = {
  saveComment,
}