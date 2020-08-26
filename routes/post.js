const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const authorizationController = require('../controllers/authorization');

//Admin routes
router.get('/', postController.getAll);

//Admin and user routes
router.get('/:postId', postController.getOne);
router.delete('/:postId', authorizationController.authorize, postController.remove);
router.post('/', authorizationController.authorize, postController.create);
router.patch('/:postId', authorizationController.authorize, postController.update);

//User routes

//Anonymous routes
router.get('/:postId/comments', postController.getPostComments);


// TODO: Endpoints with relationships

module.exports = router;