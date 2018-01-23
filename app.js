var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');

var app = express();

// webpack config
// process.env.NODE_ENV需要在启动项目时作为命令参数传入
// 如果不传入参数，则会被视为undefined
if (process.env.NODE_ENV !== 'production') {    // development config

    var webpack = require('webpack');
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    // 获取webpack配置文件
    var webpackConfig = require('./webpack.config.js');
    // 调用配置文件内容
    var webpackCompiled = webpack(webpackConfig);
    // 此处devMiddleware的定义非常重要
    // 它类似于一个中间件，修饰了webpackCompiled
    // 只有通过这步的定义才能够使用webpackCompiled.outputFileSystem.readFile函数
    // 详细可以看路由文件
    var devMiddleware = webpackDevMiddleware(webpackCompiled, {
        publicPath: webpackConfig.output.publicPath,
        quiet: true //向控制台显示任何内容
    });
    // 热更新配置
    var hotMiddleware = webpackHotMiddleware(webpackCompiled,{
        log: false,
        heartbeat: 2000
    });
    app.use(devMiddleware);
    app.use(hotMiddleware);
    // 使用全局变量global是一种不优雅的做法
    // 但是为了能够在路由文件中使用webpackCompiled.outputFileSystem.readFile
    // 而不重新获取路由文件并定义devMiddleware，这种方法是相对合适的
    global.webpackCompiled = webpackCompiled;
    // 导入路由文件
    require('./routes/index')(app);

} else {    // production config
    // dev-middle-ware本质上是提供静态文件服务，适用于开发环境
    // 生产环境中还是使用express原生的方法提供服务
    app.use('/static', express.static(path.join(__dirname, 'static')));

    require('./routes/index')(app);
}

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
