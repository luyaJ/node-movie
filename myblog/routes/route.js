// const express = require('express');
// const router = express.Router();

// router.get('/', function(req, res) {
//   // res.send('欢迎');
//   res.render('index', {title:'myblog'})
// });

// module.exports = router;

const User = require('../controllers/user');

module.exports = function (app) {

  app.use(function(req, res, next){
    responseData = {
      code: 0,
      message: ''
    }
    next();
  });
  // 主页
  app.get('/', function (req, res) {
    res.render('post', {
      title: '主页'
    });
  });

  // User
  app.post('/register', User.register);
  app.post('/login', User.login);
  app.get('/login', User.showLogin);
  app.get('/register', User.showRegister);
  // app.get('/logout', User.logout);

  // 查看文章 (主页、个人主页、查看一篇文章)
  // app.get('/post', function (req, res) {

  // });
  // app.get('/post?author=xxx', function (req, res) {

  // });
  // app.get('/post/:postId', function (req, res) {

  // });

  




  // 发表文章
  // app.get('/post/create', function (req, res) {
  //   res.render('/post/create')
  // });
  // app.post('/post/create', function (req, res) {

  // });

  // 修改文章
  // app.get('/post/:postId/edit', function (req, res) {

  // });
  // app.post('/post/:postId/edit', function (req, res) {

  // });

  // 删除文章
  // app.get('/post/:postId/delete', function (req, res) {

  // });

  // 留言
  // app.post('/comments', function (req, res) {

  // });
  // app.get('/comments/:commentId/delete', function (req, res) {

  // });

}