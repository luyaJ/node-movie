const User = require('../models/user');

// register get
exports.showRegister = function (req, res) {
  res.render('register', {
    title: "注册页"
  });
}

// register post
exports.register = function (req, res) {
  let _user = req.body.user;
  // 判断是否已经注册过了
  User.findOne({
    name: _user.name
  }, function (err, user) {
    if (err) {
      console.log(err);
    }
    // 如果用户已经存在
    if (user) {
      return res.redirect('/login');
    } else {
      var user = new User(_user);
      user.save(function (err, user) {
        if (err) {
          console.log(err);
        }
        res.redirect('/login');
      });
    }
  });
}

// login get
exports.showLogin = function (req, res) {
  res.render('login', {
    title: "登录页",
  });
}

// login post
exports.login = function (req, res) {
  const _user = req.body.user;
  const name = _user.name;
  const password = _user.password;

  // 登录验证密码
  User.findOne({
    name: name
  }, function (err, user) {
    if (err) {
      console.log(err);
    }

    // 如果用户不存在
    if (!user) {
      return res.redirect('/register');
    }

    // 密码比较
    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        console.log(err);
      }
      if (isMatch) {
        //为了把用户登录状态存储进数据库，防止刷新后用户需要重新登录
        // 所以需要 session （cookie-session & cookie-parser）
        req.session.user = user;
        return res.redirect('/');
      } else {
        return res.redirect('/login');
        // console.log('password is not match!');
      }
    });
  });
}

// logout
exports.logout = function (req, res) {
  delete req.session.user;
  // delete app.locals.user;
  res.redirect('/');
}


// userlist
exports.userList = function (req, res) {
  User.fetch(function (err, users) {
    if (err) {
      console.log(err);
    }
    res.render('userlist', {
      title: "用户列表页",
      users: users
    });
  });
}