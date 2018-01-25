// const express = require('express');
// const router = express.Router();

// module.exports = router;

const Index = require('../controllers/index');
const User = require('../controllers/user');

module.exports = function (app) {
 
  // Index 主页
  app.get('/', Index.index);

  // User 登录 注册 注销
  app.post('/register', User.register);
  app.post('/login', User.login);
  app.get('/register', User.showRegister);
  app.get('/login', User.showLogin);
  app.get('/logout', User.logout);
  app.get('/admin', User.rigisterRequired, User.adminRequired, User.adminIndex);
}