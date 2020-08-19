const { savePost, deletePost, updatePost } = require('../models/Post');

async function create(post) {
  const data = await savePost(post);
  return data;
} 

async function remove(id) {
  const numDeleted = await deletePost(id);
  return numDeleted;
}

async function update(id, title, content) {
  const numUpdated = await updatePost(id, title, content);
  return numUpdated;
}

module.exports = { create, remove, update };

