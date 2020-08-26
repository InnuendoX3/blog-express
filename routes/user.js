const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { route } = require('./post');

router.get('/', userController.getAll);
router.post('/login', userController.login)
router.get('/authorize', userController.authorize, userController.checkIfUserIsAuthorized);

router.get('/:userId', userController.getOne);
router.post('/', userController.create);
router.delete('/:userId', userController.remove);
router.patch('/:userId', userController.update);


// Routes with relationships
router.get('/:userId/posts', userController.getUserPosts);
router.get('/:userId/comments', userController.getUserComments);

module.exports = router;