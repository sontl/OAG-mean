'use strict';

angular.module('mean.attributes').config(['$stateProvider',
  function($stateProvider) {
      $stateProvider.state('attributes example page', {
          url: '/attributes/example',
          templateUrl: 'attributes/views/index.html'
      })
      .state('all attributes', {
          url: '/attributes',
          templateUrl: 'attributes/views/list.html'
      })
      .state('create attribute', {
          url: '/attributes/create',
          templateUrl: 'attributes/views/create.html'
      })
      .state('edit attribute', {
          url: '/attributes/:attributeId/edit',
          templateUrl: 'attributes/views/edit.html'
      })
      .state('attribute by type and id', {
          url: '/attributes/:attributeId',
          templateUrl: 'attributes/views/view.html'
      });
  }
]);