'use strict';

angular.module('mean.artworks').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('artworks example page', {
      url: '/artworks/example',
      templateUrl: 'artworks/views/index.html'
    });
  }
]);
