const { findPosts, findPost, savePost, deletePost, updatePost } = require('../models/post');
const { findComments } = require('../models/comment');
const post = require('../models/post');

// Get all posts
// Admin get all posts
// User just his own posts
async function getAll(req, res) {
  let queryFilter = {}  // Admin {}
  if(req.user.role === 'User') {
    queryFilter = {ownerId: req.user.userId}
  }
  const posts = await findPosts(queryFilter);
  res.send(posts).status(200);
}

// Get a post
// Admin get a post from everybody
// User just his own post
async function getOne(req, res) {
  const postId = req.params.postId;
  const userId = req.user.userId;
  const userRole = req.user.role;

  const post = await findPost(postId);

  if(post === null) {
    return res.status(400).send({message: 'Post not found'})
  };

  if(userRole !== 'Admin' && post.ownerId !== userId) {
    res.sendStatus(401)
  } else {
    res.status(200).send(post);
  }
}

// Create new post
// No authorization needed.
// OwnerId is entered from payloads token
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
// Admin can remove comments from anybody
// User just his own
async function remove(req, res) {
  const postId = req.params.postId;
  const userId = req.user.userId;
  const role = req.user.role;
  let queryFilter = {}

  if(role === 'Admin') {
    queryFilter = { _id: postId }
  }

  if(role === 'User') {
    queryFilter = {
      _id: postId,
      ownerId: userId
    }
  }

  const numDeleted = await deletePost(queryFilter);
  if(numDeleted === 0) return res.status(400).send({message: 'Bad request or unauthorized'})
  const message = `${numDeleted} document(s) deleted`;
  res.send({message}).status(200);
}

// Update a post using its Id
async function update(req, res) {
  const postId = req.params.postId;
  let queryFilter = {}

  // New post info
  const title = req.body.title;
  const content = req.body.content;

  // User info
  const userId = req.user.userId;
  const role = req.user.role;

  if(role === 'Admin') {
    queryFilter = {
      _id: postId
    }
  }

  if(role === 'User') {
    queryFilter = {
      _id: postId,
      ownerId: userId
    }
  }

  const numUpdated = await updatePost(queryFilter, title, content);
  if(numUpdated === 0) return res.status(400).send({message: 'Bad request or unauthorized'})
  const message = `${numUpdated} document(s) updated`;
  res.send({message}).status(200);
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

