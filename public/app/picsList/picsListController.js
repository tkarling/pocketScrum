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
        this.thumbnailUrl = this.url + "/thumbnail?id=";
        this.fullPicUrl = this.url + "/fullpic?id=";

        var self = this;
        picsStore.addListener(function () {
            self.resetPics();
        });

    }

    resetPics() {
        this.pics = this.picsStore.getPics();
        this.currentPic = this.picsStore.getCurrentPic();
        this.errorMsg = this.picsStore.getErrorMsg();
    }

    addPic(pic) {
        this.f = pic;
        this.picsActions.addPic(pic);
    }

    removePic(pic, event) {
        this.f = undefined;
        this.picsActions.removePic(pic);
        if(event){
            event.stopPropagation();
            event.preventDefault();
        }
    }

    selectPic(pic) {
        this.f = undefined;
        //console.log("selectPic", pic);
        this.picsActions.selectPic(pic);
    }

}

angular.module("myApp").controller("PicsListController", PicsListController);