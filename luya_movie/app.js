const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const _ = require('underscore');

const Movie = require('./models/movie'); // 渲染时用到


const port = process.env.PORT || 3000;
const app = express();
const dbUrl = 'mongodb://101.132.128.72:27017/luya_movie';
mongoose.connect(dbUrl);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public'))); // 设置存放静态文件的文件夹
app.locals.moment = require('moment'); 

app.listen(port);
console.log('movies start on port ' + port);

// index
app.get('/', function(req, res) {
	Movie.fetch(function(err, movies) {
		if(err){
			console.log(err);
		}
		res.render('index', {
			title: "首页",
			movies: movies
		});
	});
});

// detail
app.get('/movie/:id', function(req, res) {
	const id = req.params.id;
	Movie.findById(id, function(err, movie) {
		res.render('detail', {
			title: "详情页 " + movie.title,
			movie: movie
		});
	});	
});

// admin
app.get('/admin/movie', function(req, res) {
	res.render('admin', {
		title: "后台录入页",
		movie:{
      title: '',
      doctor: '',
			county: '',
			language: '',
			flash: '',
      poster: '',		
			year: '',
      summary: ''
    }
	});
});

// admin update
app.get('/admin/update/:id', function(req, res) {
	const id = req.params.id;
	if(id) {
		Movie.findById(id, function(err, movie) {
			if(err) {
				console.log(err);
			}
			res.render('admin', {
				title: '后台更新页',
				movie: movie
			});
		});
	}
});

// admin post 到从后台录入页传来的信息
app.post('/admin/movie/new', function(req, res) {
	const movieObj = req.body.movie;
	const id = movieObj._id;
	let _movie;

	if(id !== 'undefined') {
		Movie.findById(id, function(err, movie) {
			if(err) {
				console.log(err);
			}
			if(movie == undefined) {
				movie = new Movie({
					title: movieObj.title,
          doctor: movieObj.doctor,     
          country: movieObj.country,
          language: movieObj.language,
          flash: movieObj.flash,
					poster: movieObj.poster,
					year: movieObj.year,
          summary: movieObj.summary
        });
			}
			_movie = _.extend(movie, movieObj); // 更新
			_movie.save(function(err, movie){
				if(err){
					console.log(err);
				}
				res.redirect('/movie/' + movie._id);
			});
		});
	} else {
		_movie = new Movie({
      title: movieObj.title,
			doctor: movieObj.doctor,     
			country: movieObj.country,
			language: movieObj.language,
			flash: movieObj.flash,
			poster: movieObj.poster,
			year: movieObj.year,
			summary: movieObj.summary
		});
		_movie.save(function(err, movie) {
      if(err) {
        console.log(err);
      }
      res.redirect('/movie/' + movie._id)
    });
	}
});

// list
app.get('/admin/list', function(req, res){
	Movie.fetch(function(err, movies) {
		if(err){
			console.log(err);
		}
		res.render('list', {
			title: "列表页",
			movies: movies
		});
	});	
});

// list delete
app.delete('/admin/list', function(req, res) {
	const id = req.query.id;
	if(id) {
		Movie.remove({_id: id}, function(err, movies) {
			if(err) {
				console.log(err);
			} else {
				res.json({success: 1})
			}
		});
	}
});

/* 测试数据 */
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
// app.get('/admin/movie/new', function(req, res){
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