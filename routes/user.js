const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { authorizeAdmin } = require('../middlewares/authorization')

// Authorization for Admin
router.get('/', authorizeAdmin, userController.getAll);
router.get('/:userId', authorizeAdmin, userController.getOne);
router.delete('/:userId', authorizeAdmin, userController.remove);
router.patch('/:userId', authorizeAdmin, userController.update);

// Authorization for anonymous
router.post('/login', userController.login)
router.post('/', userController.create);

// ? Routes needed ?
router.get('/:userId/posts', authorizeAdmin, userController.getUserPosts);
router.get('/:userId/comments', authorizeAdmin, userController.getUserComments);

module.exports = router;