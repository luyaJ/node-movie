const Index = require('../controllers/index');
const User = require('../controllers/user');
const Movie = require('../controllers/movie');

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
  app.get('/admin/userlist', User.userList);

  // Movie
  app.get('/movie/:id', Movie.detail);
  app.get('/admin/movienew', Movie.new);
  app.get('/admin/update/:id', Movie.update);
  app.post('/admin/movie', Movie.save);
  app.get('/admin/movielist', Movie.movieList);
  app.delete('/admin/movielist', Movie.delete)













}