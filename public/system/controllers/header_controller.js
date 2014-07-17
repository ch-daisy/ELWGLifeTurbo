'use strict';

angular.module('elwglife.system')
    .controller('HeaderCtrl', 
        function($scope, $state) {
            // 默认的菜单栏选项
            var defaultMainMenu = [{
                title: '值日系统',
                link: 'duty'
            }, {
                title: '通讯录',
                link: 'contacts'
            }];
            $scope.menus = defaultMainMenu;

            // 默认跳转到通讯录页面
            $state.go('contacts');
        }
);
