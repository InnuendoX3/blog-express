const { savePost, deletePost, updatePost, saveComment } = require('../models/post');


async function create(req, res) {
  const post = req.body;
  const info = await savePost(post);
  res.send(info).status(201);
} 

async function remove(req, res) {
  const postId = req.params.postId;
  const numDeleted = await deletePost(postId);
  const message = `${numDeleted} document(s) deleted`;
  res.send(message).status(201);
}

async function update(req, res) {
  const postId = req.params.postId;
  const title = req.body.title;
  const content = req.body.content;
  const numUpdated = await updatePost(postId, title, content);
  const message = `${numUpdated} document(s) updated`;
  res.send(message).status(200);
}

async function createComment(req, res) {
  const commentToSave = {
    postId: req.params.postId,
    comment: req.body.comment
  };
  const info = await saveComment(commentToSave); 
  res.send(info).status(201);
}

module.exports = { create, remove, update, createComment };

