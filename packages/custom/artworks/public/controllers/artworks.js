'use strict';

angular.module('mean.artworks').controller('ArtworksController', ['$scope', '$stateParams', '$location',
    'Global', 'Artworks', 'FileUploader',
    function($scope, $stateParams, $location, Global, Artworks, FileUploader) {
        $scope.global = Global;

        $scope.hasAuthorization = function(artwork) {
            if (!artwork || !artwork.user) return false;
            return $scope.global.isAdmin || artwork.user._id === $scope.global.user._id;
        };

        $scope.create = function(isValid) {
            if (isValid) {
                var artwork = new Artworks({
                    title: this.title,
                    content: this.content
                });
                artwork.$save(function(response) {
                    $location.path('artworks/' + response._id);
                });

                this.title = '';
                this.content = '';
            } else {
                $scope.submitted = true;
            }
        };

        $scope.remove = function(artwork) {
            if (artwork) {
                artwork.$remove();

                for (var i in $scope.artworks) {
                    if ($scope.artworks[i] === artwork) {
                        $scope.artworks.splice(i, 1);
                    }
                }
            } else {
                $scope.artwork.$remove(function(response) {
                    $location.path('artworks');
                });
            }
        };

        $scope.update = function(isValid) {
            if (isValid) {
                var artwork = $scope.artwork;
                if (!artwork.updated) {
                    artwork.updated = [];
                }
                artwork.updated.push(new Date().getTime());

                artwork.$update(function() {
                    $location.path('artworks/' + artwork._id);
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.find = function() {
            Artworks.query(function(artworks) {
                $scope.artworks = artworks;
            });
        };

        $scope.findOne = function() {
            Artworks.get({
                artworkId: $stateParams.artworkId
            }, function(artwork) {
                $scope.artwork = artwork;
            });
        };

        $scope.isHideUploadStandards = false;

        $scope.hideUploadStandards = function() {
            $scope.isHideUploadStandards = !$scope.isHideUploadStandards;
            $scope.currentTpl='artwork-details.html';
        }

        var uploader = $scope.uploader = new FileUploader({
            url: 'http://localhost:8080/v1/object'
        });

        // FILTERS
        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };
    }
]);
