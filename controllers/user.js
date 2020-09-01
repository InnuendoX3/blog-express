const { findUsers, adminFindUser, userFindUser, saveUser, deleteUser, updateUser, loginUser } = require('../models/user');
const { findComments } = require('../models/comment');
const { findPosts } = require('../models/post');
const jwt = require('jsonwebtoken');
const secret = "random string";

// Get all users
async function getAll(req, res) {
  if (req.user.role === "Admin") {
    const users = await findUsers();
    res.send(users).status(200); 
  } else {
    res.send("Only admins can do that, sunny")
  }
}

// Get a user
async function getOne(req, res) {
  const userId = req.params.userId;
  if (req.user.role == "Admin") {
    const user = await adminFindUser(userId);

    if (user === null) {
      res.send({message: 'User not found'}).status(400);
    } else {
      res.send(user).status(200);
    }

  } else if(req.user.role == "User") {
    const user = await userFindUser(userId)
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
  /*
  if(req.user.role === "Admin") {

  } else {

  }
  */
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
  const role = req.body.role;
  const numUpdated = await updateUser(userId, username, password, role);
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


async function login(req, res) {
  try{
    const user = {
      username: req.body.username,
      password: req.body.password
    }
    const login = await loginUser(user);
    const toEncrypt = {
      username: login.username,
      userId: login._id,
      role: login.role
    }
    const token = jwt.sign(toEncrypt, secret, {expiresIn: "1h"})
    res.json({token});
  }catch(err) {
    res.sendStatus(401)
  }
}


module.exports = { 
  getAll,
  getOne,
  create,
  remove,
  update,
  getUserPosts,
  getUserComments,
  login
};