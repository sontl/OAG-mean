'use strict';

angular.module('mean.artcollections').controller('ArtcollectionsController', ['$scope', 'Global', 'Artcollections',
  function($scope, Global, Artcollections) {
    $scope.global = Global;
    $scope.package = {
      name: 'artcollections'
    };
  }
]);
