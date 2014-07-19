'use strict';

var contactsModule = angular.module('elwglife.contacts');

contactsModule.controller('ContentController',
    function($scope, Contacts) {
        $scope.contactsList = Contacts.query();
    }
);