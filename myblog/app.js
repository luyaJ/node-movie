const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
// const mongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
// const cookieSession = require('cookie-session');
const favicon = require('serve-favicon');
const ejsLint = require('ejs-lint');

var port = process.env.PORT || 3000;
var app = express();

// 模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json()); // 加载解析json的中间件
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // 设置存放静态文件的文件夹
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(session({
  secret: 'secret',
  cookie: {
    maxAge: 1000*60*30
  },
  resave: false,
  saveUninitialized: true
}));

app.use(function(req,res,next){ 
  res.locals.user = req.session.user;   // 从session 获取 user对象
  var err = req.session.error;   //获取错误信息
  delete req.session.error;
  res.locals.message = "";   // 展示的信息 message
  if(err){ 
      res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
  }
  next();  //中间件传递
});

// 路由控制器
const router = require('./routes/route');
router(app);

app.locals.moment = require('moment');

app.listen(port);
console.log("starts on port", port);