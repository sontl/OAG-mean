/**
 * Created by sontl on 29/9/14.
 */
'use strict';

/**
 * Module dependencies.
 */
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose'),
    Photo = mongoose.model('Photo'),
    _ = require('lodash');


/**
 * Find photo by id
 */
exports.photo = function (req, res, next, id) {
    Photo.load(id, function (err, photo) {
        if (err) return next(err);
        if (!photo) return next(new Error('Failed to load photo ' + id));
        req.photo = photo;
        next();
    });
};

/**
 * Create a photo
 */
exports.create = function (req, res) {
//    fs.readFile(req.files.displayImage.path, function (err, data) {
//        var newPath = __dirname + "/uploads/uploadedFileName";
//        fs.writeFile(newPath, data, function (err) {
//            res.json(newPath);
//        });
//    });
    var uploadPath = path.normalize('uploads');
    var file = req.files.file;

    //get created file name
    var newFileName = file.path.substring(file.path.lastIndexOf("/"));
    var uploadPath = uploadPath + "/" + req.user._id;
    //copy from tmp folder to user upload folder
    console.log(uploadPath);

    var mkdirSync = function (path) {
        try {
            fs.mkdirSync(path);
        } catch (e) {
            if (e.code != 'EEXIST') throw e;
        }
    }

    var mkdirpSync = function (dirpath) {
        var parts = dirpath.split(path.sep);
        for (var i = 1; i <= parts.length; i++) {
            mkdirSync(path.join.apply(null, parts.slice(0, i)));
        }
    }

    //create folder if not exist
    mkdirpSync(uploadPath);
    var targetPath = uploadPath + newFileName;
    fs.createReadStream(file.path).pipe(fs.createWriteStream(targetPath));
    //delete file in tmp folder
    fs.unlinkSync(file.path);

    //save photo reference in database
    var photo = new Photo(req.body);
    photo.user = req.user;
    photo.path = targetPath;

    photo.save(function (err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot save the photo'
            });
        }
        res.json(photo);
    });
};

/**
 * Delete a photo
 */
exports.destroy = function (req, res) {
    var photo = req.photo;
    fs.unlink(photo.path, function (err) {
        if (err) throw err;
        console.log('successfully deleted ' + photo.path);
        photo.remove(function (err) {
            if (err) {
                return res.json(500, {
                    error: 'Cannot delete the photo'
                });
            }
            res.json(photo);
        });
        res.json("delete successfully");
    });
};

/**
 * Show a photo
 */
exports.show = function (req, res) {
    var photo = req.photo;
    console.log("Get photo requested");
    fs.readFile(photo.path, "binary", function (error, file) {
        if (error) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            res.write(error + "\n");
            res.end();
        }
        else {
            res.writeHead(200, {"Content-Type": "image/png"});
            res.write(file, "binary");
            res.end();
        }
    });
};

