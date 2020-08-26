const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authorizationController = require('../controllers/authorization');

// Admin routes
router.get('/', authorizationController.authorize, userController.getAll);

// User routes

// Admin and user routes
router.get('/:userId', authorizationController.authorize, userController.getOne);
router.delete('/:userId', authorizationController.authorize, userController.remove);
router.patch('/:userId', authorizationController.authorize, userController.update);
// Routes with relationships
router.get('/:userId/posts', authorizationController.authorize, userController.getUserPosts);
router.get('/:userId/comments', authorizationController.authorize, userController.getUserComments);

// Anonymous routes
router.post('/login', authorizationController.login)
router.post('/', userController.create);





module.exports = router;