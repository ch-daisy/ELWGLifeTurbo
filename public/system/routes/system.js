'use strict';

//Setting up route
angular.module('elwglife.system')
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            // For unmatched routes:
            $urlRouterProvider.otherwise('/');

            // states for my app
            $stateProvider
                .state('duty', {
                    url: '/duty',
                    templateUrl: 'public/duty/views/index.html'
                })
                .state('contacts', {
                    url: '/contacts',
                    templateUrl: 'public/contacts/views/index.html'
                })
                .state('home', {
                    url: '/',
                    templateUrl: 'public/system/views/index.html'
                });
        }
    ])
    .config(['$locationProvider',
        function($locationProvider) {
            // 若浏览器支持HTML5的history API，则删除URL的#
            // if(window.history && window.history.pushState){
            //     $locationProvider.html5Mode(true);
            // } else {
            //     // 否则只能强制浏览器使用带#的URL
            //     $locationProvider.hashPrefix('!');                
            // }
        }
    ]);
