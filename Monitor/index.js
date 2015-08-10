var watch = require('watch');



var Cloud = require('esh-deployment-cloud');


var File = require('esh-deployment-cloud/File');



module.exports.start = function(configPath) {
	var config = require(configPath);
	Cloud = new Cloud(config.qn);
	var removerCloudKey = function(f) {
		var file = new File(f, config.assets_path);
		file.asdok = true;
		Cloud.Start(file);
	}
	watch.createMonitor(config.assets_path, function(monitor) {
		console.log('开始监视' + config.assets_path);
		// monitor.on("created", function(f, stat) {
		// 	console.log('文件新增');
		// })
		monitor.on("changed", function(f, curr, prev) {
			console.log(f + '文件变化');
			removerCloudKey(f);
		})
		monitor.on("removed", function(f, stat) {
			console.log(f + '文件删除');
			removerCloudKey(f);
		})
	})
}