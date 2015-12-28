var seajs_combo = require("./../util/seajs-combo.js");
var content_type_inspector = require("./../util/content-type-inspector.js")
module.exports = function(req, res, next) {
	var _path = req.params[0];
	var moduleurls = req.params[1];
	seajs_combo(moduleurls, _path, req.isDebug, function(e, data) {
		res.header('Content-Type', content_type_inspector(null, '.js'));
		res.send(data);
	});
}