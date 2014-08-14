'use strict';

module.exports = function(app) {
    var contacts = require('../controllers/contacts');
    app.get('/api/contacts', contacts.getContacts);
    app.post('/api/contacts', contacts.insertContacts);
    app.put('/api/contacts', contacts.updateContacts);
    app.delete('/api/contacts/:id', contacts.deleteContacts);
};
