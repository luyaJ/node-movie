var mongoose = require('mongoose');
// (node:7916) DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;  
var dbUrl = 'mongodb://101.132.128.72:27017/myblog';

// mongoose.connect(dbUrl, {
//   useMongoClient: true
// });
mongoose.connect(dbUrl);

// 连接成功
mongoose.connection.on('connected', function () {    
  console.log('数据库连接成功');  
});    

// 连接异常
mongoose.connection.on('error',function (err) {    
  console.log('数据库连接异常' + err);  
});    
 
// 连接断开
mongoose.connection.on('disconnected', function () {    
  console.log('数据库断开了');  
});    

module.exports = mongoose;