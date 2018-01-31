const Movie = require('../models/movie'); // 渲染时用到
const Comment = require('../models/comment');
const Category = require('../models/category');
const _ = require('underscore');

// detail (电影信息 & 评论)
exports.detail = function (req, res) {
  const id = req.params.id;

  Movie.findById(id, function (err, movie) {

    // 通过查询电影的id 来查找comment评论
    Comment
      .find({
        movie: id
      })
      .populate('from', 'name')
      .populate('reply.from reply.to', 'name')
      .exec(function (err, comments) {
        res.render('detail', {
          title: "详情页 ",
          movie: movie,
          comments: comments
        });
      });
  });
}

// admin new
exports.new = function (req, res) {
  Category.find({}, function (err, categories) {
    res.render('admin', {
      title: "后台录入页",
      categories: categories,
      movie: {}
    });
  });
}

// admin update
exports.update = function (req, res) {
  const id = req.params.id;
  if (id) {
    Movie.findById(id, function (err, movie) {
      Category.find({}, function (err, categories) {
        res.render('admin', {
          title: '后台更新页',
          movie: movie,
          categories: categories
        });
      });
    });
  }
}

// admin post 到从后台录入页传来的信息(保存)
exports.save = function (req, res) {
  const movieObj = req.body.movie;
  const id = movieObj._id;
  let _movie;

  if (id) {
    Movie.findById(id, function (err, movie) {
      if (err) {
        console.log(err);
      }

      _movie = _.extend(movie, movieObj); // 更新
      _movie.save(function (err, movie) {
        if (err) {
          console.log(err);
        }
        res.redirect('/movie/' + movie._id);
      });
    });
  } else {
    _movie = new Movie(movieObj);

    const categoryId = movieObj.category;
    const categoryName = movieObj.categoryName;

    _movie.save(function (err, movie) {
      if (err) {
        console.log(err)
      }
      // 判断是radio还是自己输入 自己输入的如果不存在就新建一个
      if (categoryId) {
        Category.findById(categoryId, function (err, category) {
          // 如果出现（'push' undefined）检查schemas中的实例对象属性拼写是否正确...
          category.movies.push(movie._id);

          category.save(function (err, category) {
            res.redirect('/movie/' + movie._id)
          });
        });
      } else if (categoryName) {
        const category = new Category({
          name: categoryName,
          movies: [movie._id]
        });

        category.save(function(err, category){
          movie.category = category._id;
          movie.save(function(err, movie){
            res.redirect('/movie/' + movie._id)
          });   
        });
      }
    });
  }
}

// movielist
exports.movieList = function (req, res) {
  Movie.fetch(function (err, movies) {
    if (err) {
      console.log(err);
    }
    res.render('movielist', {
      title: "列表页",
      movies: movies
    });
  });
}

// list delete
exports.delete = function (req, res) {
  const id = req.query.id;
  if (id) {
    Movie.remove({
      _id: id
    }, function (err, movies) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          success: 1
        })
      }
    });
  }
}