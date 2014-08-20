'use strict';

var systemModule = angular.module('elwglife.system');

systemModule.controller('HeaderCtrl', 
    function($scope, $state) {
        var defaultMainMenu = [{
            title: '通讯录',
            link: 'contacts'
        }, {
            title: '值日系统',
            link: 'duty'
        }];

        // 设置默认的菜单栏选项
        $scope.menus = defaultMainMenu;

        // 设置移动端header的折叠效果
        $scope.isCollapsed = true;
        $scope.collapseHeader = function() {
            $scope.isCollapsed = !$scope.isCollapsed;
        };

        // 默认跳转到通讯录页面
        $state.go('contacts');
    }
);
