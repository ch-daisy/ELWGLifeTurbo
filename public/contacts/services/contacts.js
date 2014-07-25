'use strict';

var contactsModule = angular.module('elwglife.contacts');

contactsModule.factory('Contacts', function($resource) {
    return $resource('/api/contacts/:id', {
        id: '@id'
    }, {
        update: {method: 'PUT'}
    });
});

contactsModule.factory('ContactsLoader', function(Contacts) {
    return function() {
        return Contacts.query(); 
    };
});
