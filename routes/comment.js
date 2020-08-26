const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
const userController = require('../controllers/user');


router.get('/', userController.authorize, commentController.getAll);
router.get('/:commentId', userController.authorize, commentController.getOne)
router.post('/', userController.authorize, commentController.create);
router.delete('/:commentId', userController.authorize, commentController.remove);
router.patch('/:commentId', userController.authorize, commentController.update);

module.exports = router;