const mongoose = require('mongoose');
const MovieSchema = require('../schemas/movie');
// 编译生成Movie原型
const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;