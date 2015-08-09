var config = global.__CONFIG = require('./config.js');
var content_type_inspector = require("./util/content-type-inspector.js")
var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();
var log4js = require('log4js');
app.configure(function() {
	// app.disable('etag')
	app.set("port", config.run_port);
	app.set("views", config.demo_path);
	app.set("view engine", "jade");
	app.use(express.favicon());
	//日志支持
	log4js.configure({
		appenders: [{
			type: 'console'
		}]
	});
	logger = log4js.getLogger('normal');
	logger.setLevel('INFO');
	app.use(log4js.connectLogger(logger, {
		level: log4js.levels.INFO
	}));
	app.use(function(req, res, next) {
		//缓存时间
		res.header("Cache-Control", "max-age=2592000")
		next();
	})



	app.post(/update/, require("./routes/update.js"));

	//TODO:将amdcombo中的pkg提成全局在普通的js在请求中也可以获得到缓存
	//seajs多文件combo和压缩输出
	app.get(/\/Static\/(.*?)\/\$\$(.*)/i, require("./routes/sea_route.js"));


	//js 静态服务，支持压缩
	//
	app.get(/Static\/js\/(.*)\.js/i, require("./routes/js_route.js"));

	app.get(/Static\/(.*)\.css$/i, require("./routes/css_route.js"));

	//其他文件的静态服务
	app.get(/Static\/(.*)$/i, function(req, res, next) {
		var _path = req.params[0]
		var filePath = path.join(config.assets_path, _path);
		// var fileContent = fs.readFileSync(filePath, "utf-8")
		// res.header('Content-Type', content_type_inspector(filePath));
		// res.send(fileContent);
		res.header('Access-Control-Allow-Origin', '*');
		res.sendfile(filePath);
	});


	app.locals.pretty = true;
	app.all("*", function(req, res, next) {
		res.header("Cache-Control", "max-age=0")
		return res.send("页面不存在", 404);
	});
	app.use(function(err, req, res, next) {
		console.trace(err);
		res.header("Cache-Control", "max-age=0")
		return res.send(err.message, 404);
	});
	app.locals.moment = require('moment');
	return app.locals.moment.lang('zh-cn');
});

app.set('env', 'development');

app.configure("development", function() {
	return app.use(express.errorHandler());
});
require('http').createServer(app).listen(config.run_port, function() {
	console.log("Express server listening on port " + app.get("port"));
}).setMaxListeners(0);
module.exports = app;