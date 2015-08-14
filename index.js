var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

var pathModule = require('path');



module.exports.Start = function(configPath) {

	var configPath = configPath || pathModule.resolve(process.cwd(), 'config.js');
	if (cluster.isMaster) {
		var app = require('./app');
		app.init(configPath);
		//主线程用来监听端口
		app.StartListen();
		//fork一个work进程用来监控
		cluster.fork();
	} else if (cluster.isWorker) {
		// var monitor = require('./Monitor');
		// monitor.start(configPath);
	}
}