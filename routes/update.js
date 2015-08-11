var formidable = require('formidable');
var fs = require('fs');
var pathModule = require('path');
var ndir = require('ndir');


module.exports = function(req, res, next) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(error, fields, files) {
		var savePath = pathModule.resolve(global.__CONFIG.assets_path, fields.rePath);

		fs.exists(files.upload.path, function(exists) {
			if (exists) {
				ndir.copyfile(files.upload.path, savePath, function(err) {
					if (err) {
						throw err;
					}
					res.send('ok');
				});
			}

		});

	});
}