'use strict';

module.exports = function(app) {
    var contacts = require('../controllers/contacts');

    app.get('/api/contacts', contacts.getContacts);
    
};
