var amd_simplecombine = require('amd-simplecombine');
var pathModule = require('path');
var join = pathModule.join;

module.exports = function(moduleurls, filePath, isDebug, callback) {

	//var files = moduleurls.split(',');
	var configPath = pathModule.resolve(process.cwd(), 'config.js');
	var globalConfig = require(configPath);   //config.js
	var separator=require(join(globalConfig.assets_path, 'rootConfig.js')).comboSyntax[1];

	var files = moduleurls.split(separator);
	amd_simplecombine.parseAmdModule(files, {
		assets_path: global.__CONFIG.assets_path,
		modules_path: filePath,
		isDebug: isDebug
	}, callback);
};