'use strict';

angular.module('mean.artcollections').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('artcollections example page', {
      url: '/artcollections/example',
      templateUrl: 'artcollections/views/index.html'
    });
  }
]);
