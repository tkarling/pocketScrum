"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PicsListController = (function () {
    function PicsListController(picsStore, picsActions, Upload, $timeout) {
        _classCallCheck(this, PicsListController);

        this.picsStore = picsStore;
        this.picsActions = picsActions;
        this.Upload = Upload;
        this.$timeout = $timeout;
        this.resetPics();

        var self = this;
        picsStore.addListener(function () {
            self.resetPics();
        });

        //this.$watch('files', function() {
        //    this.upload(this.files);
        //});
    }

    _createClass(PicsListController, [{
        key: "resetPics",
        value: function resetPics() {
            this.pics = this.picsStore.getPics();
        }
    }, {
        key: "addPic",
        value: function addPic(pic) {
            this.picsActions.addPic(pic);
            this.newPic = "";
        }
    }, {
        key: "removePic",
        value: function removePic(pic) {
            this.picsActions.removePic(pic);
        }
    }, {
        key: "uploadFiles",
        value: function uploadFiles(file) {
            this.f = file;
            console.log("file", file);
            if (file && !file.$error) {
                file.upload = this.Upload.upload({
                    url: 'http://localhost:3039/api/pocketScrum/uploads',
                    file: file
                });

                var self = this;
                file.upload.then(function (response) {
                    self.$timeout(function () {
                        file.result = response.data;
                        console.log("result", file.result);
                    });
                }, function (response) {
                    if (response.status > 0) self.errorMsg = response.status + ': ' + response.data;
                });

                file.upload.progress(function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            }
        }

        //upload(files) {
        //    var thisUser = "moi";
        //    if (files && files.length) {
        //        var file = files[0];
        //        Upload.upload({
        //            url: 'http://localhost:3039',
        //            fields: {
        //                'username': thisUser
        //            },
        //            file: file
        //        }).progress(function(evt) {
        //            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        //            console.log('progress: ' + progressPercentage + '% ' +
        //                evt.config.file.name);
        //        }).success(function(data, status, headers, config) {
        //            this.image = data;
        //            if (this.image.uploadError) {
        //                this.user.uploadError = this.image.uploadError;
        //                console.log('error on hand');
        //            } else {
        //                this.user.uploadError = '';
        //                //UserImage.saveUserImage(thisUser, $scope.image.path, function(data) {
        //                //    $scope.loadUserImage(data.username);
        //                //});
        //            }
        //        });
        //    }
        //}

    }]);

    return PicsListController;
})();

angular.module("myApp").controller("PicsListController", PicsListController);

//# sourceMappingURL=picsListController-compiled.js.map