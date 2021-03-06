'use strict';

//Artworks service used for artworks REST endpoint
angular.module('mean.artworks').factory('Artworks', ['$resource',
    function($resource) {
        return $resource('artworks/:artworkId/:author', {
            artworkId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
