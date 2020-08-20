const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');

router.post('/', postController.create);
router.delete('/:postId', postController.remove);
router.put('/:postId', postController.update);
router.post('/:postId/addcomment', postController.createComment);

////

/* router.post('/', async (req, res) => {
  const data = await postController.create(req.body)
  res.send(data).status(201)
}) 

router.delete('/:postId', async (req, res) => {
  const numDeleted = await remove(req.params.postId)
  const message = `${numDeleted} document(s) deleted`
  res.send(message).status(201)
})


router.put('/:postId', async (req, res) => {
  const numUpdated = await update(req.params.postId, req.body.title, req.body.content);
  const message = `${numUpdated} document(s) updated`
  res.send(message).status(200)
}) 

router.post('/:postId/addcomment', async (req, res) => {
  const data = await createComment(req.params.postId, req.body.comment)
  res.send(data).status(201)
}) */

module.exports = router;