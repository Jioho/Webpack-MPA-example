var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next) {

    var filename = path.join(__dirname, '../views', 'index1.html');

    if (process.env.NODE_ENV !== 'production') {

        global.webpackCompiled.outputFileSystem.readFile(filename, function(err, result) {
            if (err) {
                // something error
                return next(err);
            }
            res.set('content-type', 'text/html');
            res.send(result);
            res.end();
        });

    } else {
        res.sendFile(filename);
    }

});

module.exports = router;