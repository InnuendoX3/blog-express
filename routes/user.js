const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { authorizeAdmin, authorizeUser} = require('../middlewares/authorization')

// Authorization for Admin
router.get('/', authorizeAdmin, userController.getAll);

// Authorization for User (His own id by controller)
router.get('/:userId', authorizeUser, userController.getOne);
router.delete('/:userId', authorizeUser, userController.remove);
router.patch('/:userId', authorizeUser, userController.update);

// Authorization for anonymous
router.post('/login', userController.login)
router.post('/', userController.create);


// ? Routes needed ?
router.get('/:userId/posts', authorizeAdmin, userController.getUserPosts);
router.get('/:userId/comments', authorizeAdmin, userController.getUserComments);

module.exports = router;