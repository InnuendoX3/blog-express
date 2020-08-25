const express = require('express');
const app = express();
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const userRoutes = require('./routes/user');

app.use(express.json());
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/users', userRoutes);


app.listen(3000, () => { console.log('App listening on port 3000')});
