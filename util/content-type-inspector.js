var mime = require("mime");
var path = require("path");
module.exports = function(filePath,extname) {
    return mime.lookup(extname?extname:path.extname(filePath));
}