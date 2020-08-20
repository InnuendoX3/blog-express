const { savePost, deletePost, updatePost, saveComment } = require('../models/Post');

async function create(post) {
  const info = await savePost(post);
  return info;
} 

async function remove(id) {
  const numDeleted = await deletePost(id);
  return numDeleted;
}

async function update(id, title, content) {
  const numUpdated = await updatePost(id, title, content);
  return numUpdated;
}

async function createComment(postId, comment) {
  const commentToSave = {
    postId,
    comment,
  };
  const info = await saveComment(commentToSave); 
  return info;
}

module.exports = { create, remove, update, createComment };

