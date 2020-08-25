const { findUsers, findUser, saveUser, deleteUser, updateUser } = require('../models/user');
const { findComments } = require('../models/comment');
const { findPosts } = require('../models/post');

// Get all users
async function getAll(req, res) {
  const users = await findUsers();
  res.send(users).status(200);
}

// Get a user
async function getOne(req, res) {
  const userId = req.params.userId;
  const user = await findUser(userId);
  if (user === null) {
    res.send({message: 'User not found'}).status(400);
  } else {
    res.send(user).status(200);
  }
}

// Create new user
async function create(req, res) {
  const user = req.body;
  const info = await saveUser(user);
  res.send(info).status(201);
} 

// Remove user by Id
async function remove(req, res) {
  const userId = req.params.userId;
  const numDeleted = await deleteUser(userId);
  const message = `${numDeleted} document(s) deleted`;
  res.send({message}).status(200);
}

// Update a user using its Id
async function update(req, res) {
  const userId = req.params.userId;
  const username = req.body.username;
  const password = req.body.password;
  const numUpdated = await updateUser(userId, username, password);
  const message = `${numUpdated} document(s) updated`;
  res.send(message).status(200);
}

// Relationships
async function getUserPosts(req, res) {
  const userId = req.params.userId;
  const filter = { userId };
  const posts = await findPosts(filter);
  res.send(posts).status(200);
}

async function getUserComments(req, res) {
  const userId = req.params.userId;
  const filter = { userId };
  const comments = await findComments(filter);
  res.send(comments).status(200);
}


module.exports = { 
  getAll,
  getOne,
  create,
  remove,
  update,
  getUserPosts,
  getUserComments
};