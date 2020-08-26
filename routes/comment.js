const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
const authorizationController = require('../controllers/authorization');


// Admin routes
router.get('/', authorizationController.authorize, commentController.getAll);

// Admin and user routes
router.get('/:commentId', authorizationController.authorize, commentController.getOne)
router.post('/', authorizationController.authorize, commentController.create);
router.delete('/:commentId', authorizationController.authorize, commentController.remove);
router.patch('/:commentId', authorizationController.authorize, commentController.update);

// User routes

// Anonymous routes


module.exports = router;