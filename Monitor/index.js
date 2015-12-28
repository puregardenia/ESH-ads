var watch = require('watch');



var Cloud = require('esh-deployment-cloud');


var File = require('esh-deployment-cloud/File');

var needle = require('needle');

module.exports.start = function(configPath) {
	var config = require(configPath);
	Cloud = new Cloud(config.qn);
	var CloudStart = function(f, option) {
		var file = new File(f, config.assets_path);
		Cloud.Start(file, option, function(err, arg) {
			console.log(f + arg);
		});
	}
	watch.createMonitor(config.assets_path, function(monitor) {
		console.log('开始监视' + config.assets_path);
		// monitor.on("created", function(f, stat) {
		// 	console.log('文件新增');
		// })
		monitor.on("changed", function(f, curr, prev) {
			console.log(f + '文件变化');
			CloudStart(f);
		})
		monitor.on("removed", function(f, stat) {
			console.log(f + '文件删除');
			CloudStart(f, {
				RemoveKey: true
			});
		})
	})
}