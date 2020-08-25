const { findPosts, findPost, savePost, deletePost, updatePost, saveComment } = require('../models/post');

// Get all posts
async function getAll(req, res) {
  const posts = await findPosts();
  res.send(posts).status(200);
}

// Get a post
async function getOne(req, res) {
  const postId = req.params.postId;
  const post = await findPost(postId);
  res.send(post).status(200);
}

// Create new post
async function create(req, res) {
  const post = req.body;
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

// Create a comment for a post, by its post Id
async function createComment(req, res) {
  const commentToSave = {
    postId: req.params.postId,
    comment: req.body.comment
  };
  const info = await saveComment(commentToSave); 
  res.send(info).status(201);
}

module.exports = { getAll, getOne, create, remove, update, createComment };

