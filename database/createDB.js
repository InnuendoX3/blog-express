require('dotenv').config();
const Datastore = require('nedb');

console.log(process.env.ENVIRONMENT)

let dbUsers,
    dbPosts,
    dbComments

switch(process.env.ENVIRONMENT) {
  case 'development':
    dbUsers = new Datastore({ filename: './database/store-users.db', autoload: true});
    dbPosts = new Datastore({ filename: './database/store-posts.db', autoload: true});
    dbComments = new Datastore({ filename: './database/store-comments.db', autoload: true});
  break;
  case 'test':
    dbUsers = new Datastore({ filename: './test/database-for-tests/store-users.db', autoload: true});
    dbPosts = new Datastore({ filename: './test/database-for-tests/store-posts.db', autoload: true});
    dbComments = new Datastore({ filename: './test/database-for-tests/store-comments.db', autoload: true});
    dbUsers.remove({}, { multi: true })
    dbPosts.remove({}, { multi: true })
    dbComments.remove({}, { multi: true })
  break;
}

module.exports = {
  dbUsers,
  dbPosts,
  dbComments
}