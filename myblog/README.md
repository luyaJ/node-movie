# 使用node + experss搭建一个博客

## 目录结构

```bash
# 在该目录下运行npm init生成package.json
$ npm init
```

在MyBlog下建立文件夹：

* models: 存放操作数据库的文件
* public: 存放静态文件，如样式、图片等
* routes: 存放路由文件
* views: 存放模板文件
* index.js: 程序主文件

## 安装依赖模块

```bash
$ npm install express express-session connect-mongo --save
```
* express: web 框架
* express-session: session中间件
* connect-mongo: 将session存储于mongodb，结合express-session使用
* connect-flash: 页面通知的中间件，基于session实现
* ejs: 模板
* express-formidable: 接收表单及文件上传的中间件
* config-lite: 读取配置文件
* marked: markdown 解析
* moment: 时间格式化
* mongolass: mongodb 驱动
* objectid-to-timestamp: 根据ObjectId生成时间戳
* sha1: sha1 加密，用于密码加密

生成一个express实例app，挂载了一个根路由控制器，然后监听3000端口并启动程序。运行node index.js，打开浏览器访问localhost:3000时，页面应显示hello。

```bash
# index.js
const express = require('express');
const app = express();

app.get('/', function(req, res){
  res.send('hello');
});

app.listen(3000);
console.log("port starts");
```

## supervisor

在开发过程中，每次修改代码保存后，都需要重启程序，才能看到效果，为了解决这个麻烦，我们全局安装supervisor：
```bash
$ npm install supervisor -g
```

## 路由

```bash
app.get('/users/:name', function(req, res){
  res.send('hello,' + req.params.name);
});
```
`req.query`: 解析后的url中的 querystring，如?name=haha，req.query 的值为 {name: 'haha'}
`req.params`: 解析 url 中的占位符，如 /:name，访问 /haha，req.params 的值为 {name: 'haha'}
`req.body`: 解析后请求体，需使用相关的模块，如 body-parser，请求体为 {"name": "haha"}，则 req.body 为 {name: 'haha'}

使用下面这种方法也可以上面代码的合并：

根目录下的index.js:
```bash
const express = require('express');
const app = express();
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', userRouter);

app.listen(3000);
console.log("port starts");
```

根目录下/routes/index.js:
```bash
const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
  res.send('hello,luya');
});

module.exports = router;
```

根目录下/routes/router.js:
```bash
const express = require('express');
const router = express.Router();

router.get('/:name',function(req, res){
  res.send('hello', req,params.name);
});

module.exports = router;
```

## 使用模板引擎pug

```bash
$ npm i ejs --save

# 在根目录index.js下增加这些代码
const path = require('path');
app.set('views', path.join(__dirname, 'views'));  // 设置存放模板文件的目录
app.set('view engine', 'ejs');  // 设置模板引擎pug
```

## render

通过调用`res.render`函数渲染pug模板，`res.render`第一个参数是模板的名字，这里是`users`则会匹配 `views/users.pug`，第二个参数是传给模板的数据，这里传入 `name`，则在pug模板中可使用`name`。

`res.render`的作用就是将**模板**和**数据**结合生成html，同时设置响应头中的`Content-Type: text/html`，告诉浏览器我返回的是html，不是纯文本，要按html展示。

## bower

```bash
# 安装包管理器bower
npm install bower
# 通过包管理器安装 jquery & bootstrap
bower install jquery
bower install bootstrap
```

## 路由规则

### req.query:
```bash
// GET /search?q=tobi+ferret  
req.query.q  
// => "tobi ferret"  

// GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse  
req.query.order  
// => "desc"  

req.query.shoe.color  
// => "blue"  

req.query.shoe.type  
// => "converse"  
```

### req.body:
```bash
// POST user[name]=tobi&user[email]=tobi@learnboost.com  
req.body.user.name  
// => "tobi"  

req.body.user.email  
// => "tobi@learnboost.com"  

// POST { "name": "tobi" }  
req.body.name  
// => "tobi" 
```

### req.params:
```bash
// GET /user/tj  
req.params.name  
// => "tj"  

// GET /file/javascripts/jquery.js  
req.params[0]  
// => "javascripts/jquery.js" 
```

### req.param(name):
```bash
// ?name=tobi  
req.param('name')  
// => "tobi"  

// POST name=tobi  
req.param('name')  
// => "tobi"  

// /user/tobi for /user/:name   
req.param('name')  
// => "tobi"  
```

* req.query： 处理 get 请求，获取 get 请求参数
* req.params： 处理 /:xxx 形式的 get 或 post 请求，获取请求参数
* req.body： 处理 post 请求，获取 post 请求体
* req.param()： 处理 get 和 post 请求
* 但查找优先级由高到低为 req.params → req.body → req.query

## mongoose入门

### 安装与连接

安装mongoose:
```bash
npm install mongoose --save
```

创建一个db.js:
```bash
var mongoose = require('mongoose');
var dbUrl = 'mongodb://101.132.128.72:27017/myblog';

mongoose.connect(dbUrl, {
  useMongoClient: true
});

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
```

### Schema

Schema是mongoose里会用到的一种数据模式，可以理解为表结构的定义。每个Schema会映射到mongodb中的一个Connection，他不具备操作数据库的能力。

定义Schema非常简单，指定字段名和类型即可，支持的类型包括以下8种:
* String      字符串 
* Number      数字     
* Date        日期
* Buffer      二进制
* Boolean     布尔值
* Mixed       混合类型
* ObjectId    对象ID    
* Array       数组

```bash
# 在db.js中增加以下代码：
module.exports = mongoose;
```

下面定义一个user的Schema，命名user.js:
```bash
var mongoose = require('../db.js');
var Schema = mongoose.Schema;

var UserSchema = new Schema({          
  username : { type: String },                    
  password: { type: String },                        
  avator: { type: String },                        
  bio: { type: String }
});

# 根据用户名找到用户，用户名全局唯一
UserSchema.index({ namename: 1 },{ unique: true }).exec();
```

### Model

定义好了Schema，接下来就是生成Model。model是由Schema生成的模型，可以对数据库进行操作。

我们对上面的定义的user的schema生成一个User的model并导出，在user.js中增加以下代码：
```bash
module.exports = mongoose.model('User', UserSchema);
```

### 常用数据库操作

#### 插入(save)




