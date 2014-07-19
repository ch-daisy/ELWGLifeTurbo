'use strict';

var contactsModule = angular.module('elwglife.contacts');

contactsModule.controller('AddContactsModalController', 
    function($scope, $modalInstance, Contacts) {
        $scope.gradeList = ['14级学硕', '14级工硕', '13级学硕', '13级工硕', '12级学硕', '12级工硕', '老师'];
        $scope.teacherList = ['许炜', '程文青', '夏天', '黑晓军'];

        $scope.contacts = new Contacts({
            sex: 'male',
            grade: $scope.gradeList[0],
            teacher: $scope.teacherList[0]
        });

        $scope.submit = function() {
            $scope.contacts.$save(function(contacts) {
                console.log('save contacts');
            });
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }
);
