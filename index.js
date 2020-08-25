const express = require('express');
const app = express();
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');


app.use(express.json());
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);


app.listen(3000, () => { console.log('App listening on port 3000')})
