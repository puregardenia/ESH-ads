var UglifyJS = require("uglify-js");

module.exports = function(filePath, callback) {
	//跳过require否则压缩后seajs无法从代码中获取到依赖的模块
	//todo:判断是否为标准的amd模块,如果是amd就构建成标准的amd模块,然后就可以进行全部变量名称的压缩
    var result = UglifyJS.minify(filePath,{
    	 mangle:{except:'require'}
    });
    return result.code;
}