var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser')
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goods = require('./routes/goods');
var uploadForm = require('./routes/uploadForm')
// var books = require('./routes/books/books');
var books = require('./routes/books');
// var books = require('./routes/books');
var jwt = require('jsonwebtoken');
var ejs = require('ejs')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.engine('.html',ejs.__express);
// app.set('view engine','html');

app.use(logger('dev'));
app.use(express.json());
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/images',express.static(path.join(__dirname,'public/images')))
app.use('/public/images/bookImgs',express.static(path.join(__dirname,'public/images/bookImgs')))

// 自定义跨域中间件
// var allowCors = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.header('Access-Control-Allow-Credentials','true');
//   next();
// };
// app.use(allowCors);//使用跨域中间件


// app.use(function (req, res, next) {
//   // 我这里知识把登陆和注册请求去掉了，其他的多有请求都需要进行token校验 
//   if (req.url.indexOf('/users/login') == '-1' && req.url.indexOf('/users/register') == '-1' && req.url.indexOf('/users/logout') == '-1' ) {
//       let token = req.headers.authorization;
//       let secretOrPrivateKey="suiyi";
//       jwt.verify(token, secretOrPrivateKey, function (err, decode) {
//         if (err) {  //  时间失效的时候/ 伪造的token  
//             res.json({
//               status:'500014',
//               msg:'token过期',
//               result:{
//                 err:err
//               }
//             })         
//         } else {
//             next()
//         }
//     })
//   } else {
//       next();
//   }
// });




app.all('*', function (req, res, next) {
  //响应头指定了该响应的资源是否被允许与给定的origin共享。*表示所有域都可以访问，同时可以将*改为指定的url，表示只有指定的url可以访问到资源 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",  " Origin, X-Requested-With, Content-Type, Accept, Authorization");
    //允许请求资源的方式
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/goods',goods);
app.use('/uploadForm',uploadForm);
app.use('/books',books);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
