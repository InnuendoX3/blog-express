const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/', userController.authorize, userController.getAll);
router.post('/login', userController.authorize, userController.login)
router.get('/authorize', userController.authorize, userController.checkIfUserIsAuthorized);

router.get('/:userId', userController.authorize, userController.getOne);
router.post('/', userController.authorize, userController.create);
router.delete('/:userId', userController.authorize, userController.remove);
router.patch('/:userId', userController.authorize, userController.update);


// Routes with relationships
router.get('/:userId/posts', userController.authorize, userController.getUserPosts);
router.get('/:userId/comments', userController.authorize, userController.getUserComments);

module.exports = router;