'use strict';

var express = require('express'),
    appPath = process.cwd();

module.exports = function(db) {
    // Express settings
    var app = express();
    require(appPath + '/server/config/express')(app, db);

    return app;
};
