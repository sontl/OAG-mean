'use strict';

angular.module('mean.attributes').factory('Attributes',  ['$resource',
    function($resource) {

        return $resource('attributes/:attributeId',
            {
                attributeId : '@_id'
            },
            {
                update: {
                    method: 'PUT'
                }
            });
    }
]);
