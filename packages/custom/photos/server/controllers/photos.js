/**
 * Created by sontl on 29/9/14.
 */
'use strict';

/**
 * Module dependencies.
 */
var path = require('path');
//
//app.use(multipart({
//    uploadDir: config.tmp
//}));
/**
 * Create an photo
 */
exports.create = function(req, res) {
//    fs.readFile(req.files.displayImage.path, function (err, data) {
//        var newPath = __dirname + "/uploads/uploadedFileName";
//        fs.writeFile(newPath, data, function (err) {
//            res.json(newPath);
//        });
//    });
    var uploadPath = path.normalize('/uploads');
    var file = req.files.file;

    console.log(file.name); //original name (ie: sunset.png)
    console.log(file.path); //tmp path (ie: /tmp/12345-xyaz.png)
    console.log(uploadPath); //uploads directory: (ie: /home/user/data/uploads)
};

/**
 * Delete an photo
 */
exports.destroy = function(req, res) {
    fs.unlink('/tmp/hello', function (err) {
        if (err) throw err;
        console.log('successfully deleted /tmp/hello');
        res.json("delete successfully");
    });
};

