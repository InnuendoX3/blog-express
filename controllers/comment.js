const { findComments, findComment, saveComment, deleteComment, updateComment } = require('../models/comment');

// Get all comments
async function getAll(req, res) {
  const comments = await findComments();
  res.send(comments).status(200);
}

// Ger a comment
async function getOne(req, res) {
  const commentId = req.params.commentId;
  const comment = await findComment(commentId);
  if (comment === null) {
    res.send({message: 'Comment not found'}).status(400);
  } else {
    res.send(comment).status(200);
  }
}

// Create a comment
async function create(req, res) {
  const comment = req.body;
  const info = await saveComment(comment);
  res.send(info).status(201);
}

// Remove a comment
async function remove(req, res) {
  const commentId = req.params.commentId;
  const numDeleted = await deleteComment(commentId);
  const message = `${numDeleted} comment(s) deleted`;
  res.send({message}).status(200);
}

// Update a comment
async function update(req, res) {
  const commentId = req.params.commentId;
  const text = req.body.text;
  const postId = req.body.postId;
  const ownerId = req.body.ownerId;
  const numUpdated = await updateComment(commentId, text, postId, ownerId);
  const message = `${numUpdated} comment(s) updated`;
  res.send({message}).status(200);
}

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update
}