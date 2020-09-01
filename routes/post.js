const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const { authorizeAdmin, authorizeUser } = require('../middlewares/authorization');

//Admin routes
router.get('/', authorizeAdmin, postController.getAll);

//Admin and user routes
router.get('/:postId', authorizeUser, postController.getOne);
router.delete('/:postId', authorizeUser, postController.remove);
router.post('/', authorizeUser, postController.create);
router.patch('/:postId', authorizeUser, postController.update);

//Anonymous routes
router.get('/:postId/comments', postController.getPostComments);


module.exports = router;