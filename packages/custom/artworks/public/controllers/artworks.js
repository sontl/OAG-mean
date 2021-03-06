'use strict';

angular.module('mean.artworks').controller('ArtworksController', ['$scope', '$stateParams', '$location',
    'Global', 'Artworks', 'FileUploader', 'Attributes', '$q',
    function($scope, $stateParams, $location, Global, Artworks, FileUploader, Attributes, $q) {
        $scope.global = Global;
        $scope.categories = [];
        $scope.styles = [];
        $scope.mediums = [];
        $scope.subjects = [];
        $scope.hasAuthorization = function(artwork) {
            if (!artwork || !artwork.user) return false;
            return $scope.global.isAdmin || artwork.user._id === $scope.global.user._id;
        };

        //init data for categories, styles, mediums
        Attributes.query(function(attributes) {
            for (var i = 0; i < attributes.length; i++) {
                var attribute = attributes[i];
                if (attribute && attribute.type === 'CATEGORY') {
                    $scope.categories.push(attribute);
                } else if (attribute && attribute.type === 'STYLE') {
                    attribute.text = attribute.title;
                    $scope.styles.push(attribute);
                } else if (attribute && attribute.type === 'MEDIUM') {
                    $scope.mediums.push(attribute);
                } else if (attribute && attribute.type === 'SUBJECT') {
                    $scope.subjects.push(attribute);
                }
            }
        });
        $scope.selectedCategory = {};
        $scope.selectedSubject = {};
        $scope.styleTags = [
            { text: 'Data' },
            { text: 'Documentary' },
            { text: 'Fine Art' },
            { text: 'Folk' }
        ];

        $scope.mediumTags = [
            { text: 'Digital' },
            { text: 'Interactive'}
        ];

        $scope.materialTags = [
            { text: 'Bronze' },
            { text: 'Canvas' },
            { text: 'Glass' },
            { text: 'Oil' }
        ];

        function asyncGetTag(query) {
            // perform some asynchronous operation, resolve or reject the promise when appropriate.
            console.log($q);
            var deferred = $q.defer();
                var res = [];
                console.log(query);
                for (var i = 0; i< $scope.styles.length; i++) {
                    var style = $scope.styles[i];
                    console.log('style: ', style)
                    if (query && style.text.indexOf(query) != -1 ) {
                        console.log('found style: ', style.text);
                        res.push(style);
                    }
                }
            deferred.resolve(res);
            return deferred.promise;
        }

        $scope.loadTags = function(query) {
            var promise = asyncGetTag(query);
            console.log('promise init', promise);
            promise.then(function(response) {
                console.log(response);
            }, function(reason) {
                alert('Failed: ' + reason);
            });
        };

        $scope.create = function(isValid) {
            console.log('Is form valid: ', isValid);
            var styles = [];
            for (var i=0; i< $scope.styleTags.length; i++) {
                styles.push($scope.styleTags[i].text);
            }
            var materials = [];
            for (var i=0; i< $scope.materialTags.length; i++) {
                materials.push($scope.materialTags[i].text);
            }
            var mediums = [];
            for (var i=0; i< $scope.mediumTags.length; i++) {
                mediums.push($scope.mediumTags[i].text);
            }
            if (isValid) {
                var artwork = new Artworks({
                    title: this.title,
                    photos: $scope.photos,
                    styles: styles,
                    materials: materials,
                    subject: this.selectedSubject,
                    category: this.selectedCategory,
                    dateCreated : this.dateCreated,
                    price: this.price,
                    dimensions: this.dimensions,
                    description: this.description,
                    isMixedMedia: this.isMixedMedia,
                    mediums: mediums,
                    keywords: this.keywords,
                    isCopyright: this.isCopyright,
                    isForSell: this.isForSell,
                    isFraming: this.isFraming
                });
                console.log("saved artworkd: " , artwork);
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

        Artworks.query({ userId : $scope.global.user._id},function(artworks) {
            $scope.moreArtworks = artworks;
            console.log('more artworks of user:', artworks);
        });

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
        }

        $scope.photos = [];

        var uploader = $scope.uploader = new FileUploader({
            url: '/photos',
            queueLimit : 4,
            autoUpload : true
        });

        // FILTERS
        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        //show artwork details if photos more than 1
        $scope.$watch(function() {
            return $scope.photos;
        }, function() {
            console.log($scope.photos);
            if ($scope.photos && $scope.photos.length > 0){
                $scope.isHideUploadStandards = true;
            } else {
                $scope.isHideUploadStandards = false;
            }
        }, true);

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
            if (status === 200) {
                $scope.photos.push(response);
                console.info('photos: ',  $scope.photos);
            }
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        /**
         * For datepicker controller
         */
        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
            console.log('time picker opened: ' + $scope.opened);
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
    }


]);
