'use strict';

angular.module('mean.artworks').controller('ArtworksController', ['$scope', 'Global', 'Artworks',
  function($scope, Global, Artworks) {
    $scope.global = Global;
    $scope.package = {
      name: 'artworks'
    };
  }
]);
