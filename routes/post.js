const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');

router.get('/', postController.getAllPosts);
router.get('/:postId', postController.getPost)
router.post('/', postController.create);
router.delete('/:postId', postController.remove);
router.patch('/:postId', postController.update);
router.post('/:postId/addcomment', postController.createComment);

module.exports = router;