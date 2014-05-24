'use strict';

angular.module('elwglife.contacts')
    .controller('ContentController', ['$scope', '$rootScope',
        function($scope, $rootScope) {
            $scope.global = 'hehe';
        }
    ]);