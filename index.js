const express = require('express');
const app = express();
const postRoutes = require('./routes/post');


app.use(express.json());
app.use('/post', postRoutes);


app.listen(3000, () => { console.log('App listening on port 3000')})
