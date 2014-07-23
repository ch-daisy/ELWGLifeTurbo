'use strict';

var contactsModule = angular.module('elwglife.contacts');

contactsModule.controller('ContentCtrl',
    function($scope, ContactsLoader) {
        $scope.contactsList = new ContactsLoader();

        $scope.$on('addContacts', function(e) {
            $scope.contactsList = new ContactsLoader();
        });
    }
);