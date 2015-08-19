"use strict";

class PicsListController {
    constructor(picsStore, picsActions) {
        this.picsStore = picsStore;
        this.picsActions = picsActions;
        this.resetPics();

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
}

angular.module("myApp").controller("PicsListController", PicsListController);