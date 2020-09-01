const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { authorizeAdmin, authorizeUser } = require('../middlewares/authorization')


// Admin routes
router.get('/', authorizeAdmin, userController.getAll);

// Admin and user routes
router.get('/:userId', authorizeUser, userController.getOne);
router.delete('/:userId', authorizeUser, userController.remove);
router.patch('/:userId', authorizeUser, userController.update);
// Routes with relationships
router.get('/:userId/posts', authorizeUser, userController.getUserPosts);
router.get('/:userId/comments', authorizeUser, userController.getUserComments);

// Anonymous routes
router.post('/login', userController.login)
router.post('/', userController.create);


module.exports = router;