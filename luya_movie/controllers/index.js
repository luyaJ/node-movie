const Movie = require('../models/movie'); // 渲染时用到

// index
exports.index = function(req, res) {
  Movie.fetch(function (err, movies) {
    if (err) {
      console.log(err);
    }
    res.render('index', {
      title: "首页",
      movies: movies,
    });
  });
}

