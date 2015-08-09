var amd_simplecombine = require('amd-simplecombine');
module.exports = function(moduleurls, filePath, callback) {

	var files = moduleurls.split(',');
	amd_simplecombine.parseAmdModule(files, {
		assets_path: global.__CONFIG.assets_path,
		modules_path: filePath
	}, callback);

};