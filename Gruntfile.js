'use strict';

var paths = {
    js: ['*.js', 'server/**/*.js', 'public/**/*.js', 'test/**/*.js', '!test/coverage/**', '!public/system/lib/**', 'packages/**/*.js'],
    html: ['public/**/views/**', 'server/views/**', 'packages/**/public/**/views/**', 'packages/**/server/views/**'],
    css: ['public/**/css/*.css', '!public/system/lib/**', 'packages/**/public/**/css/*.css'],
    less: ['public/**/less/*.less', '!public/system/lib/**', 'packages/**/public/**/less/*.less']
};

module.exports = function(grunt) {

    if (process.env.NODE_ENV !== 'production') {
        require('time-grunt')(grunt);
    }

    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assets: grunt.file.readJSON('server/config/assets.json'),
        clean: ['public/build'],
        watch: {
            js: {
                files: paths.js,
                // tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            js_test: {
                files: paths.js,
                tasks: ['karma:unit']
            },
            html: {
                files: paths.html,
                options: {
                    livereload: true
                }
            },
            css: {
                files: paths.css,
                // tasks: ['csslint'],
                options: {
                    livereload: true
                }
            },
            less: {
                files: paths.less,
                tasks: ['less'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            all: {
                src: paths.js,
                options: {
                    jshintrc: true
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            production: {
                files: '<%= assets.js %>'
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            src: paths.css
        },
        less: {
            development: {
                options: {
                    paths: ['public/system/assets/less']
                },
                files: {
                    'public/system/assets/css/common.css': 'public/system/assets/less/common.less'
                }
            }
        },
        cssmin: {
            combine: {
                files: '<%= assets.css %>'
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    args: [],
                    ignore: ['public/**', 'node_modules/**'],
                    ext: 'js,html',
                    nodeArgs: ['--debug'],
                    delayTime: 1,
                    env: {
                        PORT: require('./server/config/config').port
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            run: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            },
            test: {
                tasks: ['nodemon', 'watch:js_test'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        env: {
            test: {
                NODE_ENV: 'test'
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma.conf.js'
            }
        }
    });

    //Load NPM tasks
    require('load-grunt-tasks')(grunt);

    //Default task(s).
    if (process.env.NODE_ENV === 'production') {
        grunt.registerTask('default', ['clean','cssmin', 'uglify', 'concurrent:run']);
    } else {
        grunt.registerTask('default', ['clean','jshint', 'csslint', 'concurrent:run']);
    }

    //Test task.
    grunt.registerTask('test', ['env:test', 'concurrent:test']);
};
