'use strict';

angular.module('mean.artworks').config(['$stateProvider',
    function ($stateProvider) {
        // Check if the user is connected
        var checkLoggedin = function ($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function (user) {
                // Authenticated
                if (user !== '0') $timeout(deferred.resolve);

                // Not Authenticated
                else {
                    $timeout(deferred.reject);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };

        $stateProvider.state('artworks example page', {
                url: '/artworks/example',
                templateUrl: 'artworks/views/index.html'
            }).state('all artworks', {
                url: '/artworks',
                templateUrl: 'artworks/views/list.html',
            }).state('browse artworks', {
                url: '/browse',
                templateUrl: 'artworks/views/list.html',
            }).state('create artwork', {
                url: '/artworks/create',
                templateUrl: 'artworks/views/create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            }).state('edit artwork', {
                url: '/artworks/:artworkId/edit',
                templateUrl: 'artworks/views/edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            }).state('artwork by id', {
                url: '/artworks/:artworkId',
                templateUrl: 'artworks/views/view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]);
