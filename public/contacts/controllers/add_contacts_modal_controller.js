'use strict';

var contactsModule = angular.module('elwglife.contacts');

contactsModule.controller('AddContactsModalCtrl', 
    function($scope, $rootScope, $modalInstance, $location, Contacts) {
        $scope.gradeList = ['14级学硕', '14级工硕', '13级学硕', '13级工硕', '12级学硕', '12级工硕', '本科实习生', '老师'];
        $scope.teacherList = ['许炜', '程文青', '夏天', '黑晓军'];

        $scope.contacts = new Contacts({
            sex: '男',
            grade: $scope.gradeList[0],
            teacher: $scope.teacherList[0]
        });

        // 通过姓名检查通讯录是否已存在
        $scope.checkExist = function(name) {
            Contacts.query(function(contactsList) {
                angular.forEach(contactsList, function(contacts) {
                    if(contacts.name === name) {
                        $scope.contacts = contacts;
                    }
                });
            });
        };

        // 提交通讯录
        $scope.submit = function() {
            $scope.contacts.$save(function(result) {
                $scope.cancel();      
                $rootScope.$broadcast('addContacts');
            });
        };

        // 关闭表单
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }
);
