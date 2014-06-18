'use strict';

(function() {
    describe('ELWGLife Contacts controllers', function() {
        beforeEach(module('elwglife.contacts'));

        describe('Unit: Test ContentController', function() {
            var $scope, mockBackend, ctrl;
            beforeEach(inject(function($controller, $rootScope, _$httpBackend_) {
                $scope = $rootScope.$new();
                mockBackend = _$httpBackend_;
                ctrl = $controller('ContentController', {
                    $scope: $scope
                });
            }));

            it('should expose some global scope', function() {
                expect($scope.global).toBeTruthy();
            });
        });
    });
})();