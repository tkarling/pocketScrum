"use strict";

class PicsListController {
    constructor(picsStore, picsActions, Upload, $timeout) {
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

    resetPics() {
        this.pics = this.picsStore.getPics();
    }

    addPic(pic) {
        this.picsActions.addPic(pic);
        this.newPic = "";
    }

    removePic(pic) {
        this.picsActions.removePic(pic);
    }

    uploadFiles(file) {
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
                    console.log("result" file.result);
                });
            }, function (response) {
                if (response.status > 0)
                    self.errorMsg = response.status + ': ' + response.data;
            });

            file.upload.progress(function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
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

}

angular.module("myApp").controller("PicsListController", PicsListController);