const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');

router.post('/', postController.create);
router.delete('/:postId', postController.remove);
router.put('/:postId', postController.update);
router.post('/:postId/addcomment', postController.createComment);

module.exports = router;