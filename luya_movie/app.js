const express = require('express');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const mongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const logger = require('morgan');

const port = process.env.PORT || 3000;
const app = express();
const dbUrl = 'mongodb://101.132.128.72:27017/luya_movie';
mongoose.connect(dbUrl);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
// 做持久性会话 登录后刷新页面登录状态依然在
app.use(session({
	secret: 'blog',
	resave: false,
	saveUninitialized: true,
	store: new mongoStore({
		url: dbUrl,
		collection: 'sessions'
	})
}));

// 路由
const router = require('./routes/route');
router(app);

// 错误信息提示
if('development' === app.get('env')) {
  app.set('showStackError', true);
  app.use(logger(':method :url :status'));
  app.locals.pretty = true; //可读性更好
  mongoose.set('debug', true);
}

app.use(express.static(path.join(__dirname, 'public'))); // 设置存放静态文件的文件夹
app.locals.moment = require('moment');

app.listen(port);
console.log('movies start on port ' + port);



/* 
 * 测试数据 
 */
// index
// app.get('/', function(req, res){
// 	res.render('index', {
// 		title: "首页",
// 		movies: [{
// 			title: '解忧杂货铺',
// 			_id: 1,
// 			poster: "http://www.semantic-ui.cn/images/avatar2/large/kristy.png",
// 			doctor: "王俊凯"
// 		},{
// 			title: '捉妖记',
// 			_id: 2,
// 			poster: "http://www.semantic-ui.cn//images/avatar2/large/matthew.png",
// 			doctor: "白百何"
// 		}]
// 	});
// });

// // detail 
// app.get('/movie/:id', function(req, res){
// 	res.render('detail', {
// 		title: "详情页",
// 		movie: {
// 			doctor: "王俊凯",
// 			country: "中国",
// 			title: "解忧杂货铺",
// 			year: 2017,
// 			poster: "http://www.semantic-ui.cn/images/avatar2/large/kristy.png",
// 			language: "中文",
// 			flash: "http://www.myfav.es/jack",
// 			summary: "解忧杂货铺王俊凯"
// 		}
// 	});
// });

// // admin
// app.get('/admin/movie', function(req, res){
// 	res.render('admin', {
// 		title: "后台录入页",
//    movie:{
// 			title: '',
// 			doctor: '',
// 			county: '',
// 			year: '',
// 			poster: '',
// 			flash: '',
// 			summary: '',
// 			language: ''
// }
// 	});
// });

// // list
// app.get('/admin/list', function(req, res){
// 	res.render('list', {
// 		title: "列表页",
// 		movies: [{
// 			title: '解忧杂货铺',
// 			_id: 1,
// 			doctor: '1',
// 			country: "中文",
// 			year: 2017,
// 			poster: 'http://www.semantic-ui.cn/images/avatar2/large/kristy.png',
// 			language: '中文',
// 			flash: "http://www.myfav.es/jack",
// 			summary: "解忧杂货铺王俊凯"
// 		}]
// 	});
// });