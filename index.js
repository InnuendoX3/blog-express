const express = require('express');
const app = express();

app.use(express.json());

var Datastore = require('nedb')
  , db = new Datastore({ filename: './database.db' });
db.loadDatabase(function (err) {    // Callback is optional
  // Now commands will be executed
});

app.post('/create', (req, res) => {
  db.insert(req.body, function() {
    console.log(req.body)
    res.send('Done').status(200);
  })
})

app.listen(3000, () => { console.log('App listening on port 3000')})