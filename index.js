const app = require('express')();

app.use(express.json())

app.post('/create', (req, res) => {
  console.log(req.body)
})

app.listen(3000, () => { console.log('App listening on port 3000')})