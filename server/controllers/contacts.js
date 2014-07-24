'use strict';

var info = require('../models/info');

// var mongoose = require('mongoose'),
    // TODO: 在此处引入Model层的东西，例如
    // User = mongoose.model('User');

/**
 * 查询所有通讯录
 */
exports.getContacts = function(req, res) {
    // TODO: 查询数据库
    
    // 注意result必须是一个数组，内含若干contacts对象
    //var result = [{
    //    name: '林寿山',
    //    sex: true,
    //    grade: '13级学硕',
    //    mobile: '15926290828',
    //    qq: '307032614',
    //    email: 'raytaylorlin@gmail.com',
    //    teacher: '许炜'
    //}];

    //res.json(result);
    info.find(function (err, data) {
        if (err) res.json([]);
        else res.json(data);
    });
};

/**
 * 创建或更新通讯录记录
 */
exports.updateContacts = function(req, res) {
    var state = 'create';

    // 提交的内容存放在req.body中
    console.log(req.body);

    // TODO: 如果不存在同名则创建一条新记录
    // TODO: 若存在同名则更新数据库的记录（同时state = 'update'）

    //res.json({
    //    msg: state,
    //    body: req.body
    //});
    var body = new info({
        name: req.body.name,
        sex: req.body.sex,
        grade: req.body.grade,
        mobile: req.body.mobile,
        qq: req.body.qq,
        email: req.body.email,
        teacher: req.body.teacher
    });
    info.findOne({'name': req.body.name}, function (err, doc) {
        if (err) {
            res.json({
                msg: state,
                body: req.body
            });
        } else {
            if (!doc) {
                body.save(function (err, data) {
                    res.json({
                        msg: state,
                        body: req.body
                    });
                });
            } else {
                state = 'update';
                doc.update(req.body, function (err, doc) {
                    res.json({
                        msg: state,
                        body: req.body
                    });
                });
            }
        }
    });
};

/**
 * Create user
 */
// exports.create = function(req, res, next) {
//     var user = new User(req.body);

//     user.provider = 'local';

//     // because we set our user.provider to local our models/user.js validation will always be true
//     req.assert('email', 'You must enter a valid email address').isEmail();
//     req.assert('password', 'Password must be between 8-20 characters long').len(8, 20);
//     req.assert('username', 'Username cannot be more than 20 characters').len(1,20);
//     req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

//     var errors = req.validationErrors();
//     if (errors) {
//         return res.status(400).send(errors);
//     }

//     // Hard coded for now. Will address this with the user permissions system in v0.3.5
//     user.roles = ['authenticated'];
//     user.save(function(err) {
//         if (err) {
//             switch (err.code) {
//                 case 11000:
//                 case 11001:
//                     res.status(400).send('Username already taken');
//                     break;
//                 default:
//                     res.status(400).send('Please fill all the required fields');
//             }

//             return res.status(400);
//         }
//         req.logIn(user, function(err) {
//             if (err) return next(err);
//             return res.redirect('/');
//         });
//         res.status(200);
//     });
// };
// /**
//  * Send User
//  */
// exports.me = function(req, res) {
//     res.jsonp(req.user || null);
// };

// /**
//  * Find user by id
//  */
// exports.user = function(req, res, next, id) {
//     User
//         .findOne({
//             _id: id
//         })
//         .exec(function(err, user) {
//             if (err) return next(err);
//             if (!user) return next(new Error('Failed to load User ' + id));
//             req.profile = user;
//             next();
//         });
// };
