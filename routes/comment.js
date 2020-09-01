const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
const { authorizeUser } = require('../middlewares/authorization')

// Admin and User routes
router.get('/', authorizeUser, commentController.getAll);
router.get('/:commentId', authorizeUser, commentController.getOne)
router.post('/', authorizeUser, commentController.create);
router.delete('/:commentId', authorizeUser, commentController.remove);
router.patch('/:commentId', authorizeUser, commentController.update);


module.exports = router;