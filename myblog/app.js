const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const favicon = require('serve-favicon');

var port = process.env.PORT || 3000;
var app = express();

// 模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());  // 加载解析json的中间件
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));  // 设置存放静态文件的文件夹
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(session({
  secret: 'myblog',
  cookie: {maxAge: 80000},
  resave: false,
  saveUninitialized: true
}));

// 路由控制器
const router = require('./routes/route');
require('./routes/route')(app);

app.locals.moment = require('moment');

app.listen(port);
console.log("starts on port", port); 
