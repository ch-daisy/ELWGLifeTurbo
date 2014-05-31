'use strict';

var contactsModule = angular.module('elwglife.contacts');

contactsModule.controller('FunctionController',
    function($scope, $modal) {
        $scope.openAddContactsModal = function(size) {
            $modal.open({
                templateUrl: 'addContactsModal.html',
                controller: 'AddContactsModalController',
                size: size,
                resolve: {
                    items: function() {
                        return $scope.items;
                    }
                }
            });
        };
        $scope.hehe = 'hehe';
    }
);
