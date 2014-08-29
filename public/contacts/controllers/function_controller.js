'use strict';

var contactsModule = angular.module('elwglife.contacts');

contactsModule.controller('FunctionCtrl',
    function($scope, $rootScope, $modal) {
        $scope.openAddContactsModal = function(size) {
            $modal.open({
                templateUrl: 'addContactsModal.html',
                controller: 'AddContactsModalCtrl',
                size: size,
                backdrop: 'static',
                resolve: {
                    items: function() {
                        return $scope.items;
                    }
                }
            });
        };

        $scope.search = function() {
            $rootScope.$broadcast('searchKeyword', this.keyword);
        };
    }
);
