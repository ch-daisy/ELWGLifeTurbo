'use strict';

var Contacts = require('../models/contacts');

/**
 * 获取通讯录
 */
exports.getContacts = function(req, res) {
    Contacts.find(function (err, data) {
        if (err) {
            res.json([]);
        } else {
            res.json(data);
        }
    });
};

/**
 * 创建通讯录记录
 */
exports.insertContacts = function(req, res) {
    var body = new Contacts({
        name: req.body.name,
        sex: req.body.sex,
        grade: req.body.grade,
        mobile: req.body.mobile,
        qq: req.body.qq,
        email: req.body.email,
        teacher: req.body.teacher
    });
    body.save(function (err, data) {
        res.json({
            msg: 'create',
            body: req.body
        });
    });
};

/**
 * 更新通讯录记录
 */
exports.updateContacts = function(req, res) {
    Contacts.findOne({'name': req.body.name}, function (err, doc) {
        if (err || !doc) {
            res.json({
                msg: 'update',
                body: req.body
            });
        } else {
            doc.update(req.body, function (err, doc) {
                res.json({
                    msg: 'update',
                    body: req.body
                });
            });
        }
    });
};

/**
 * 删除通讯录记录
 */
exports.deleteContacts = function(req, res) {
    Contacts.remove({'_id':req.params.id}, function (err) {
        res.json({
            msg: 'delete'
        });
    });
};
