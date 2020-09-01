const jwt = require('jsonwebtoken')
const secret = "random string";

async function authorizeAdmin(req, res, next) {
  if(!req.headers.authorization) return res.sendStatus(403)
  const token = req.headers.authorization.replace('Bearer ', '')

  try {
    const payload = jwt.verify(token, secret)
    if(payload.role !== 'Admin') return res.sendStatus(401)
    req.user = payload
    next()
  } catch (error) {
    console.log(error)
    if(error instanceof jwt.TokenExpiredError) 
      return res.status(401).send({message: 'Session expired. Log in again.'})
    res.sendStatus(403)
  }
}

async function authorizeUser(req, res, next) {
  if(!req.headers.authorization) return res.sendStatus(403)
  const token = req.headers.authorization.replace('Bearer ', '')

  try {
    const payload = jwt.verify(token)
    req.user = payload
    next()
  } catch (error) {
    console.log(error)
    res.sendStatus(403)
  }
}

module.exports = {
  authorizeAdmin,
  authorizeUser
}