'use strict';

var contactsModule = angular.module('elwglife.contacts');

contactsModule.controller('ContentCtrl',
    function($scope, ContactsLoader) {
        $scope.contactsList = new ContactsLoader();

        // 添加通讯录事件
        $scope.$on('refreshContacts', function(e) {
            // 重新加载所有通讯录
            $scope.contactsList = new ContactsLoader();
        });

        // 搜索关键词事件
        $scope.$on('searchKeyword', function(e, keyword) {
            $scope.keyword = keyword;
        });
    }
);
