'use strict';

(function() {
    describe('ELWGLife Contacts controllers', function() {
        beforeEach(module('elwglife.contacts'));

        describe('Unit: Test FunctionController', function() {
            var $scope, mockBackend, ctrl;
            beforeEach(inject(function($controller, $rootScope, _$httpBackend_) {
                $scope = $rootScope.$new();
                mockBackend = _$httpBackend_;
                ctrl = $controller('FunctionController', {
                    $scope: $scope
                });
            }));

            it('should have a hehe scope', function() {
                expect($scope.hehe).toEqual('hehe');
            });
        });
    });
})();