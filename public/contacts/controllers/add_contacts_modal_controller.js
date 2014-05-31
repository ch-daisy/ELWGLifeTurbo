'use strict';

var contactsModule = angular.module('elwglife.contacts');

contactsModule.controller('AddContactsModalController', 
    function($scope, $modalInstance) {
        $scope.ok = function() {
            console.log('ok');
        };

        $scope.cancel = function() {
            console.log('cancel');
        };
    }
);
