'use strict';

angular.module('mean.attributes').controller('AttributesController', ['$scope', 'Global', 'Attributes', '$location', '$stateParams',
  function($scope, Global, Attributes, $location, $stateParams) {
    $scope.global = Global;
    $scope.package = {
      name: 'attributes'
    };

      $scope.isAdministrator = function(attributes) {
          if (!attributes) return false;
          return $scope.global.isAdmin;
      };


      $scope.remove = function(attribute) {
          if (attribute) {
              attribute.$remove();

              for (var i in $scope.attributes) {
                  if ($scope.attributes[i] === attribute) {
                      $scope.attributes.splice(i, 1);
                  }
              }
          } else {
              $scope.attribute.$remove(function(response) {
                  $location.path('attributes');
              });
          }
      };

      $scope.update = function(isValid) {
          if (isValid) {
              var attribute = $scope.attribute;
              if (!attribute.updated) {
                  attribute.updated = [];
              }
              attribute.updated.push(new Date().getTime());

              attribute.$update(function() {
                  $location.path('attributes/' + attribute._id);
              });
          } else {
              $scope.submitted = true;
          }
      };
      
      $scope.create = function(isValid) {
          if (isValid) {
              var attributes = new Attributes({
                  title: this.title,
                  type: this.type,
                  description : this.description
              });
              attributes.$save(function(response) {
                  //Go to details
                  //$location.path('attributes/' + response._id);
                  //Go to list
                  $location.path('attributes');
              });

              this.title = '';
              this.type = '';
              this.description = '';
          } else {
              $scope.submitted = true;
          }
      };

      $scope.find = function() {
          Attributes.query(function(attributes) {
              $scope.attributes = attributes;
          });
      };

      $scope.findOne = function() {
          Attributes.get({
              attributeId: $stateParams.attributeId
          }, function(attribute) {
              $scope.attribute = attribute;
          });
      };

  }
]);
