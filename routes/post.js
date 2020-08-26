const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const userController = require('../controllers/user')

router.get('/', postController.getAll);
router.get('/:postId', postController.getOne);
router.post('/', userController.authorize, postController.create);
router.delete('/:postId', userController.authorize, postController.remove);
router.patch('/:postId', userController.authorize, postController.update);

// TODO: Endpoints with relationships
router.get('/:postId/comments', postController.getPostComments);

module.exports = router;