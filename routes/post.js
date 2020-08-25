const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');

router.get('/', postController.getAll);
router.get('/:postId', postController.getOne);
router.post('/', postController.create);
router.delete('/:postId', postController.remove);
router.patch('/:postId', postController.update);

// Dejarlo?
router.post('/:postId/addcomment', postController.createComment);

module.exports = router;