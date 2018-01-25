const User = require('../models/user');
const path = require('path');

// get /register 注册页面
exports.showRegister = function (req, res) {
  res.render('register', {
    title: '注册页面'
  })
}

// post /register 用户注册
exports.register = function (req, res, next) {
  const name = req.body.name;
  const password = req.body.password;
  const repassword = req.body.repassword;

  User.findOne({
    name: name
  }, function (err, user) {
    if (err) {
      res.send(500);
      req.session.error = '网络异常错误！';
      console.log(err);
    } else if (user) {
      req.session.error = '用户名已存在';
      res.send(500);
    } else {
      User.create({
        name: name,
        password: password
      }, function (err, user) {
        if (err) {
          res.send(500);
          console.log(err);
        } else {
          req.session.error = '用户名创建成功！';
          res.send(200);
          // res.redirect('/login');
        }
      });
    }
  });

  // 测试用例
  // var userEntity = new User({
  //   name: 'luya',
  //   password: 'luya',
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

// get /login 登录页面
exports.showLogin = function (req, res) {
  res.render('login', {
    title: '登录页面'
  })
}

// post /login 用户登录
exports.login = function (req, res) {
  const name = req.body.name;
  const password = req.body.password;

  User.findOne({ name: name }, function (err, user) {
    if (err) {
      res.send(500);
      console.log(err);
    } 
    if (!user) {
      req.session.error = '用户名不存在';
      res.send(404);
      res.redirect("/login");
    }
    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        console.log(err);
      }
      if (isMatch) {
        // 把信息传入session中
        req.session.user = user; // 会话
        return res.redirect('/')
      } else {        
        req.session.error = '密码错误';
        return res.redirect('/login');
      }
    }); 
  });
}

// get /logout 注销->session中user,error对象置空，并重定向到根路径
exports.logout = function (req, res) {
  delete req.session.user;
  res.redirect("/");
}


exports.rigisterRequired = function (req, res, next) {
  var user = req.session.user;
  if(!user){
    return res.redirect('/register');
  }
  next();
}

exports.adminRequired = function (req, res, next) {
  var user = req.session.user;
  if(!user.isAdmin){
    return res.redirect('/login');
  }
  next();
}

// admin index 
exports.adminIndex = function(req, res, next) {
  res.render('admin', {
    title: '后台管理页'
  })
}

// admin user 
exports.adminUser = function(req, res) {
  res.render('admin/user_index', {
    user: req.user
  })
}
