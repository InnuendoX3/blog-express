const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');


router.get('/', commentController.getAll);
router.get('/:commentId', commentController.getOne)

router.post('/', commentController.create);

router.delete('/:commentId', commentController.remove);
router.patch('/:commentId', commentController.update);

module.exports = router;