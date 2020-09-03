const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const { authorizeUser } = require('../middlewares/authorization');

//Admin and user routes
router.get('/', authorizeUser, postController.getAll);
router.get('/:postId', authorizeUser, postController.getOne);
router.delete('/:postId', authorizeUser, postController.remove);
router.post('/', authorizeUser, postController.create);
router.patch('/:postId', authorizeUser, postController.update);

// ? Is necessary this route ?
router.get('/:postId/comments', authorizeUser, postController.getPostComments);


module.exports = router;