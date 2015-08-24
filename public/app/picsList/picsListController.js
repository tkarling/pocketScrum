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
            picsStore.addListener(function () {
                self.resetCurrentPic();
            });
        });

    }

    resetPics() {
        this.pics = this.picsStore.getPics();
        this.errorMsg = this.picsStore.getErrorMsg();
    }

    resetCurrentPic() {
        this.currentPic = this.picsStore.getCurrentPic();
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
        //this.savePic();
        this.f = undefined;
        //console.log("selectPic", pic);
        this.picsActions.selectPic(pic);
    }

    savePic() {
        this.picsActions.savePic(this.currentPic);
    }

}

angular.module("myApp").controller("PicsListController", PicsListController);