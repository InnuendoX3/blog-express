const { findPosts, findPost, savePost, deletePost, updatePost } = require('../models/post');
const { findComments } = require('../models/comment');

// Get all posts
async function getAll(req, res) {
  const posts = await findPosts();
  res.send(posts).status(200);
}

// Get a post
async function getOne(req, res) {
  const postId = req.params.postId;
  const post = await findPost(postId);
  if (post === null) {
    res.send({message: 'Post not found'}).status(400);
  } else {
    res.send(post).status(200);
  }
}

// Create new post
async function create(req, res) {
  const post = {
    title: req.body.title,
    content: req.body.content,
    ownerId: req.user.userId
  }
  const info = await savePost(post);
  res.send(info).status(201);
} 

// Remove post by Id
async function remove(req, res) {
  const postId = req.params.postId;
  const numDeleted = await deletePost(postId);
  const message = `${numDeleted} document(s) deleted`;
  res.send({message}).status(200);
}

// Update a post using its Id
async function update(req, res) {
  const postId = req.params.postId;
  const title = req.body.title;
  const content = req.body.content;
  const numUpdated = await updatePost(postId, title, content);
  const message = `${numUpdated} document(s) updated`;
  res.send(message).status(200);
}

// Relationships
async function getPostComments(req, res) {
  const postId = req.params.postId;
  const filter = { postId };
  const comments = await findComments(filter);
  res.send(comments).status(200);
}

module.exports = { 
  getAll, 
  getOne, 
  create, 
  remove, 
  update,
  getPostComments
};

