const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const secret = "random string";

async function authorize(req, res, next) {
  if(!req.headers.authorization) return res.sendStatus(403)
  const token = req.headers.authorization.replace("Bearer ", "");
  try {
      const payload = await jwt.verify(token, secret);
      req.user = payload;
      next();
  } catch (error) {
      res.sendStatus(403);
  }
}

async function login(req, res) {
  try{
  const user = {
    username: req.body.username,
    password: req.body.password
  }
  const login = await userModel.loginUser(user);
  const token = jwt.sign({username: login.username, role: login.role}, secret, {expiresIn: "1h"})
  res.json({token});
  }catch(err) {
    res.sendStatus(401)
  }
}

module.exports = {
    authorize,
    login
}