var config = global.__CONFIG;
var path = require("path");
var content_type_inspector = require("./../util/content-type-inspector.js")
var CleanCSS = require('clean-css');
var fs = require("fs");
module.exports = function(req, res, next) {
    var _path = req.params[0]
    var filePath = path.join(config.assets_path, _path + '.css');
    var soure = '';
    if (fs.existsSync(filePath)) {
        soure = fs.readFileSync(filePath, "utf-8")
    }
    new CleanCSS().minify(soure, function(errors, minified) {
        res.header('Content-Type', content_type_inspector(filePath));
        res.send(minified);
    });
}