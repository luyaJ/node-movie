const Movie = require('../models/movie');
const Category = require('../models/category');

// index
exports.index = function (req, res) {
  Category
    .find({})
    .populate({
      path: 'movies',
      select: 'title poster',
      options: {
        limit: 5
      }
    })
    .exec(function (err, categories) {
      if (err) {
        console.log(err);
      }
      res.render('index', {
        title: "首页",
        categories: categories,
      });
    })
}

// search page
exports.search = function (req, res) {
  const catId = req.query.cat;
  const q = req.query.q;
  const page = parseInt(req.query.p, 10) || 0;
  const count = 2;
  const index = page * count;

  //先看有没有catId
  if(catId){
    Category
    .find({_id: catId})
    .populate({
      path: 'movies',
      select: 'title poster'
    })
    .exec(function (err, categories) {
      if (err) {
        console.log(err);
      }
      const category = categories[0] || {};
      const movies = category.movies || [];
      const results = movies.slice(index, index + count);

      res.render('results', {
        title: "结果列表页面",
        keyword: category.name,
        currentPage: page + 1, // 参数是从0开始的 所以加1
        query: 'cat=' + catId,
        totalPage: Math.ceil(movies.length / count), //向上舍入 当该页面只有单数条电影时（如1部电影是1/2=0.5）就是1了
        movies: results,
      });
    });
  } else { 
    // 通过搜索框来找
    Movie
    .find({title: new RegExp(q+'.*', 'i')})
    .exec(function(err, movies){
      if(err){
        console.log(err);
      }
      const results = movies.slice(index, index + count);

      res.render('results', {
        title: "结果列表页面",
        keyword: q,
        currentPage: page + 1, // 参数是从0开始的 所以加1
        query: 'q=' + q,
        totalPage: Math.ceil(movies.length / count), //向上舍入 当该页面只有单数条电影时（如1部电影是1/2=0.5）就是1了
        movies: results,
      });
    })
  }

  
}