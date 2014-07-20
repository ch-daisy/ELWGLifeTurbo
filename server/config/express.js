'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    errorHandler = require('errorhandler'),
    consolidate = require('consolidate'),
    flash = require('connect-flash'),
    helpers = require('view-helpers'),
    config = require('./config'),
    expressValidator = require('express-validator'),
    appPath = process.cwd(),
    assetmanager = require('assetmanager'),
    swig = require('swig');

module.exports = function(app, db) {
    app.set('showStackError', true);
    app.locals.pretty = true;
    app.locals.cache = 'memory';

    app.use(compression({
        level: 9
    }));

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }

    app.engine('html', consolidate[config.templateEngine]);
    app.set('view engine', 'html');
    app.set('views', config.root + '/server/views');
    app.enable('jsonp callback');
    app.use(cookieParser());
    app.use(expressValidator());
    app.use(bodyParser());
    app.use(methodOverride());
    app.use(cookieParser());

    // 导入静态文件
    var assets = assetmanager.process({
        assets: require('./assets.json'),
        debug: (process.env.NODE_ENV !== 'production'),
        webroot: '/public'
    });
    app.use(function(req, res, next) {
        res.locals.assets = assets;
        next();
    });

    app.use(helpers(config.app.name));
    app.use(flash());

    app.use(favicon(appPath + '/public/system/assets/img/favicon.ico'));
    app.use('/public', express.static(config.root + '/public'));

    app.engine('html', swig.renderFile);
    app.set('views', __dirname + '/../views');

    app.get('/', function(req, res) {
        res.render('index');
    });

    /* 配置主要API的路由 */
    require('../routes/contacts_api')(app);

    app.use(function(err, req, res, next) {
        // Treat as 404
        if (~err.message.indexOf('not found')) return next();

        // Log it
        console.error(err.stack);

        // Error page
        res.status(500).render('500', {
            error: err.stack
        });
    });

    // Assume 404 since no middleware responded
    app.use(function(req, res) {
        res.status(404).render('404', {
            url: req.originalUrl,
            error: 'Not found'
        });
    });

    // Error handler - has to be last
    if (process.env.NODE_ENV === 'development') {
        app.use(errorHandler());
    }
};
