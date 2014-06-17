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

    // Prettify HTML
    app.locals.pretty = true;

    // cache=memory or swig dies in NODE_ENV=production
    app.locals.cache = 'memory';

    // Should be placed before express.static
    // To ensure that all assets and data are compressed (utilize bandwidth)
    app.use(compression({
        // Levels are specified in a range of 0 to 9, where-as 0 is
        // no compression and 9 is best compression, but slowest
        level: 9
    }));

    // Only use logger for development environment
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }

    // assign the template engine to .html files
    app.engine('html', consolidate[config.templateEngine]);

    // set .html as the default extension
    app.set('view engine', 'html');

    // Set views path, template engine and default layout
    app.set('views', config.root + '/server/views');

    // Enable jsonp
    app.enable('jsonp callback');

    // The cookieParser should be above session
    app.use(cookieParser());

    // Request body parsing middleware should be above methodOverride
    app.use(expressValidator());
    app.use(bodyParser());
    app.use(methodOverride());
    app.use(cookieParser());

    // 导入静态文件
    var assets = require('./assets.json');
    assetmanager.init({
        js: assets.js,
        css: assets.css,
        debug: (process.env.NODE_ENV !== 'production'),
        webroot: 'public/public'
    });

    // Add assets to local variables
    app.use(function(req, res, next) {
        res.locals.assets = assetmanager.assets;
        next();
    });

    // Dynamic helpers
    app.use(helpers(config.app.name));

    // Connect flash for flash messages
    app.use(flash());

    // Setting the fav icon and static folder
    app.use(favicon(appPath + '/public/system/assets/img/favicon.ico'));

    app.use('/public', express.static(config.root + '/public'));

    // This is where all the magic happens!
    app.engine('html', swig.renderFile);

    app.set('view engine', 'html');
    app.set('views', __dirname + '/../views');

    app.get('/', function(req, res) {
        res.render('index');
    });

    // Assume "not found" in the error msgs is a 404. this is somewhat
    // silly, but valid, you can do whatever you like, set properties,
    // use instanceof etc.
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
