'use strict';

angular.module('mean.system')
    .controller('HeaderController', ['$scope', '$rootScope', 'Global', 'Menus',
        function($scope, $rootScope, Global, Menus) {
            $scope.global = Global;
            $scope.menus = {};

            // Default hard coded menu items for main menu
            var defaultMainMenu = [{
                title: '值日系统',
                link: 'duty'
            }, {
                title: '通讯录',
                link: 'contacts'
            }];

            $scope.menus = defaultMainMenu;
        }
]);
