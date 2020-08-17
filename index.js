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
    res.send('Done').status(200);
  })
})

app.put('/update/:id', (req, res) =>  {
  const query = {
    _id: req.params.id
  }
  db.update(query, req.body, {multi: true}, (err) => { 
    if(err) {
      res.send('ID not found').status(400)
    } else {
      res.send('Updated').status(200)
    }
  }); 
})

app.delete('/delete/:id', (req, res) => {
  const query = {
    _id: req.params.id
  }
  db.remove(query, {multi: true}, (err) => { 
    if(err) {
      res.send('ID not found').status(400)
    } else {
      res.send('Removed').status(200)
    }
  }); 
})

app.listen(3000, () => { console.log('App listening on port 3000')})