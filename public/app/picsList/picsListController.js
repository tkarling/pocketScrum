"use strict";

class PicsListController {
    constructor(MY_SERVER, picsStore, picsActions, Upload, $timeout) {
        this.url = MY_SERVER.url;
        this.picsStore = picsStore;
        this.picsActions = picsActions;
        this.Upload = Upload;
        this.$timeout = $timeout;
        this.resetPics();

        this.picsBaseUrl = this.url + "/designpic";
        this.thumbnailUrl = this.url + "/thumbnail/?id=";
        this.fullPicUrl = this.url + "/fullpic/?id=";

        var self = this;
        picsStore.addListener(function () {
            self.resetPics();
        });

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

    uploadFile(file) {
        this.addedPicUrl = "";
        this.f = file;
        console.log("file", file);
        if (file && !file.$error) {
            file.upload = this.Upload.upload({
                url: this.picsBaseUrl,
                file: file
            });

            var self = this;
            file.upload.then(function (response) {
                self.$timeout(function () {
                    file.result = response.data;
                    console.log("result", file.result);
                    self.addedPicUrl = self.fullPicUrl + file.result;
                    self.f = undefined;
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

}

angular.module("myApp").controller("PicsListController", PicsListController);