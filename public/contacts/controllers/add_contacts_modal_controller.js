'use strict';

var contactsModule = angular.module('elwglife.contacts');

contactsModule.controller('AddContactsModalCtrl', 
    function($scope, $rootScope, $modalInstance, $location, Contacts) {
        var defaultContacts;

        $scope.gradeList = ['14级学硕', '14级工硕', '13级学硕', '13级工硕', '12级学硕', '12级工硕', '本科实习生', '老师'];
        $scope.teacherList = ['许炜', '程文青', '夏天', '黑晓军'];
        $scope.contacts = defaultContacts = new Contacts({
            sex: '男',
            grade: $scope.gradeList[0],
            teacher: $scope.teacherList[0]
        });

        // 通过姓名检查通讯录是否已存在
        $scope.checkExist = function(name) {
            Contacts.query(function(contactsList) {
                var contactsExist = false,
                    originName;

                // 遍历现有通讯录看名字是否已存在
                angular.forEach(contactsList, function(contacts) {
                    if(contacts.name === name) {
                        $scope.contacts = contacts;
                        contactsExist = true;
                    }
                });

                if(!contactsExist) {
                    originName = $scope.contacts.name;
                    $scope.contacts = defaultContacts;
                    $scope.contacts.name = originName;
                }

                // 该标记主要控制删除按钮是否出现，以及控制提交的HTTP方法
                $scope.contactsExist = contactsExist;
            });
        };

        // 提交通讯录
        $scope.submit = function() {
            function onRequestSuccess() {
                $scope.cancel();      
                $rootScope.$broadcast('refreshContacts');
            }
            
            if($scope.contactsExist) {
                $scope.contacts.update(onRequestSuccess);
            } else {
                $scope.contacts.$save(onRequestSuccess);
            }
        };

        // 关闭表单
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        // 删除通讯录
        $scope.delete = function() {
            $scope.contacts.$delete({id: this.contacts._id}, function(result) {
                $scope.cancel();
                $rootScope.$broadcast('refreshContacts');
            });
        };
    }
);
