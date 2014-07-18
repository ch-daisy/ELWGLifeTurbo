'use strict';

var contactsModule = angular.module('elwglife.contacts');

contactsModule.controller('AddContactsModalController', 
    function($scope, $modalInstance) {
        $scope.gradeList = ['14级', '13级', '12级', '老师'];
        $scope.teacherList = ['许炜', '程文青', '夏天', '黑晓军'];

        $scope.contacts = {
            sex: 'male',
            grade: $scope.gradeList[0],
            teacher: $scope.teacherList[0]
        };

        $scope.submit = function() {
            console.log('ok');
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }
);
