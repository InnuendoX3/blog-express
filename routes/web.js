const express = require('express');
const router = express.Router();
const { create, remove, update, createComment } = require('../controllers/PostsController');

router.post('/create', async (req, res) => {
  const data = await create(req.body)
  res.send(data).status(201)
})


router.delete('/delete/:id', async (req, res) => {
  const numDeleted = await remove(req.params.id)
  const message = `${numDeleted} document(s) deleted`
  res.send(message).status(201)
})

router.put('/update/:id', async (req, res) => {
  const numUpdated = await update(req.params.id, req.body.title, req.body.content);
  const message = `${numUpdated} document(s) updated`
  res.send(message).status(200)
})

router.post('/addcomment/:blogId', (req, res) => {
  createComment(req.params.blogId, req.body.comment)
  res.send('Commented created!').status(201)
})

module.exports = router;