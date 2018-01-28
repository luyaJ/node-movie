const mongoose = require('mongoose');
const Movie = require('../models/movie'); // 渲染时用到
const _ = require('underscore');

// detail
exports.detail = function (req, res) {
  const id = req.params.id;
  Movie.findById(id, function (err, movie) {
    res.render('detail', {
      title: "详情页 " + movie.title,
      movie: movie
    });
  });
}

// admin new
exports.new = function (req, res) {
  res.render('admin', {
    title: "后台录入页",
    movie: {
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
}

// admin update
exports.update = function (req, res) {
  const id = req.params.id;
  if (id) {
    Movie.findById(id, function (err, movie) {
      if (err) {
        console.log(err);
      }
      res.render('admin', {
        title: '后台更新页',
        movie: movie
      });
    });
  }
}

// admin post 到从后台录入页传来的信息(保存)
exports.save = function (req, res) {
  const movieObj = req.body.movie;
  const id = movieObj._id;
  let _movie;

  if (id !== 'undefined') {
    Movie.findById(id, function (err, movie) {
      if (err) {
        console.log(err);
      }
      if (movie == undefined) {
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
      _movie.save(function (err, movie) {
        if (err) {
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
    _movie.save(function (err, movie) {
      if (err) {
        console.log(err);
      }
      res.redirect('/movie/' + movie._id)
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