const Index = require('../controllers/index');
const User = require('../controllers/user');
const Movie = require('../controllers/movie');
const Comment = require('../controllers/comment');
const Category = require('../controllers/category');

module.exports = function (app) {
  // pre handle
  app.use(function (req, res, next) {
    let _user = req.session.user;
    app.locals.user = _user;
    next();
  });

  //index
  app.get('/', Index.index);

  // User
  app.get('/register', User.showRegister);
  app.get('/login', User.showLogin);
  app.get('/logout', User.logout);
  app.post('/user/register', User.register);
  app.post('/user/login', User.login);
  app.get('/admin/userlist', User.loginRequired, User.adminRequired, User.userList);

  // Movie
  app.get('/movie/:id', Movie.detail);
  app.get('/admin/movienew', User.loginRequired, User.adminRequired, Movie.new);
  app.get('/admin/update/:id', User.loginRequired, User.adminRequired, Movie.update);
  app.post('/admin/movie', User.loginRequired, User.adminRequired, Movie.save);
  app.get('/admin/movielist', User.loginRequired, User.adminRequired, Movie.movieList);
  app.delete('/admin/movielist', User.loginRequired, User.adminRequired, Movie.delete)

  // Comment
  app.post('/user/comment', User.loginRequired, Comment.save);

  // Category
  app.get('/admin/categorynew', User.loginRequired, User.adminRequired, Category.new);
  app.post('/admin/category', User.loginRequired, User.adminRequired, Category.save);
  app.get('/admin/categorylist', User.loginRequired, User.adminRequired, Category.categoryList);
  











}