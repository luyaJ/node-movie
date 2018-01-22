var User = require('../models/user');
var path = require('path');

// get /register 注册页
exports.showRegister = function (req, res) {
  res.render('register', {
    title: '注册页面'
  });
}

// post /register 用户注册
exports.register = function (req, res, next) {
  // console.log(req.body);
  const name = req.body.name;
  const password = req.body.password;
  const repassword = req.body.repassword;

  // 用户名为空
  if (name == '') {
    responseData.code = 1;
    responseData.message = '用户名不能为空';
    res.json(responseData);
    return;
  }
  // 密码为空
  if (password == '') {
    responseData.code = 2;
    responseData.message = '密码不能为空';
    res.json(responseData);
    return;
  }
  // 两次输入密码不一致  
  if (password != repassword) {
    responseData.code = 3;
    responseData.message = '两次输入密码不一致';
    res.json(responseData);
    return;
  }
  // 用户名是否被注册 数据库
  User.findOne({
    name: name
  }).then(function (userInfo) {
    if (userInfo) {
      responseData.code = 4;
      responseData.message = '用户名已经被注册了';
      res.json(responseData);
    }
    // 保存用户注册信息到数据库中
    var user = new User({
      name: name,
      password: password,
    });
    return user.save();
  }).then(function (newUserInfo) {
    // console.log(newUserInfo)
    responseData.message = '注册成功';
    // res.json(responseData);
    res.redirect('/login')
  });

  // 测试用例
  // var userEntity = new User({
  //   name: 'luya',
  //   password: 'luya',
  //   avator: 'pic1.jpg',
  //   bio: 'luyabio'
  // })

  // userEntity.save(function(err){
  //   if(err){
  //     console.log(err);
  //   } else {
  //     console.log('save it ok');
  //   }
  // })
}

// get /login 登录页
exports.showLogin = function (req, res) {
  res.render('login', {
    title: '登录页面'
  });
}

// post /login 用户登录
exports.login = function (req, res) {
  const name = req.body.name;
  const password = req.body.password;

  if (name == '' || password == '') {
    responseData.code = 1;
    responseData.message = '用户名和密码不能为空';
    res.json(responseData);
    return;
  }

  // 查询
  User.findOne({
    name: name,
    password: password
  }).then(function (userInfo) {
    if (!userInfo) {
      responseData.code = 2;
      responseData.message = '用户名或密码错误';
      res.json(responseData);
      return;
    }
    // 用户名和密码正确
    responseData.message = '登录成功';
    res.json(responseData);
    return;
  })
}