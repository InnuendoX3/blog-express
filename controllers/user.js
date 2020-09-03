const { findUsers, findUser, saveUser, deleteUser, updateUser, loginUser } = require('../models/user');
const { findComments } = require('../models/comment');
const { findPosts } = require('../models/post');
const jwt = require('jsonwebtoken');
const secret = "random string";

// Get all users. 
// Just Admin by authorizationAdmin
async function getAll(req, res) {
  if (req.user.role === "Admin") {
    const users = await findUsers();
    res.send(users).status(200); 
  } else {
    res.send("Only admins can do that, sunny")
  }
}

// Get a user
// Admin can get one user
// User can get his own user 
async function getOne(req, res) {
  const userIdToFind = req.params.userId;
  const userId = req.user.userId;
  const userRole = req.user.role;

  if(userRole !== 'Admin' && userIdToFind !== userId) return res.sendStatus(401)

  const user = await findUser(userIdToFind)
  
  if (user === null) {
    res.status(400).send({message: 'User not found'});
  } else {
    res.status(200).send(user);
  }
}

// Create new user
// Anyone can create user
async function create(req, res) {
  const user = req.body;
  const info = await saveUser(user);
  res.status(201).send(info);
} 

// Remove user by Id
// Admin can remove users
// User just his own user
async function remove(req, res) {
  const userIdToRemove = req.params.userId;
  const userId = req.user.userId;
  const userRole = req.user.role;

  console.log(userRole, userIdToRemove, userId)

  if(userRole !== 'Admin' && userIdToRemove !== userId) return res.sendStatus(401)

  const numDeleted = await deleteUser(userIdToRemove);
  const message = `${numDeleted} document(s) deleted`;
  res.status(200).send({message});
}

// Update a user using its Id
async function update(req, res) {
  const userId = req.params.userId;
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;
  const numUpdated = await updateUser(userId, username, password, role);
  const message = `${numUpdated} document(s) updated`;
  res.status(200).send(message);
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