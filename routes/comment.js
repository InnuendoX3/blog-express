const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
const { authorizeAdmin, authorizeUser } = require('../middlewares/authorization')


// Admin routes
router.get('/', authorizeAdmin, commentController.getAll);

// Admin and user routes
router.get('/:commentId', authorizeUser, commentController.getOne)
router.post('/', authorizeUser, commentController.create);
router.delete('/:commentId', authorizeUser, commentController.remove);
router.patch('/:commentId', authorizeUser, commentController.update);


module.exports = router;