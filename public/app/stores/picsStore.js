"use strict";

var ADD_PIC = "ADD_PIC";
var REMOVE_PIC = "REMOVE_PIC";

class picsActions {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }

    addPic(item) {
        this.dispatcher.emit({
            actionType: ADD_PIC,
            item: item
        });
    }

    removePic(item) {
        this.dispatcher.emit({
            actionType: REMOVE_PIC,
            item: item
        });
    }
}
angular.module("myApp").service("picsActions", picsActions);


class PicsStore extends EventEmitter {
    constructor(picsService) {
        super();
        this.picsService = picsService;

        this.pics = [];
        this.currentPic = {};
        this.errorMsg = "";

        this.emitChange();
    }

    getPics() {
        return this.pics;
    }

    getCurrentPic() {
        return this.currentPic;
    }

    getErrorMsg() {
        return this.errorMsg;
    }

    addPic(pic) {
        //this.pics.push({qty: 1, pic: pic});
        var self = this;
        this.errorMsg = "";
        return this.picsService.addPic(pic)
            .then(function (response) {
                var progress = self.currentPic.progress;
                self.currentPic = response.data;
                self.currentPic.progress = progress;
            }, function (error) {
                if (error.status > 0)
                console.log("addPic error", error);
                    self.errorMsg = error.status + ': ' + error.statusText;
            }, function (evt) {
                self.currentPic.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
                self.emitChange();
            });
    }

    removePic(pic) {
        return this.picsService.removePic(pic);
    }

    emitChange() {
        var self = this;
        this.picsService.getPicDatas().then(function (picDatas) {
            self.pics = picDatas;
            self.emit("change");
        });
    }
}

angular.module("myApp").service("picsStore", function (dispatcher, picsService) {
    var picsStore = new PicsStore(picsService);

    dispatcher.addListener(function (action) {
        switch (action.actionType) {
            case ADD_PIC:
                picsStore.addPic(action.item).then(function (response) {
                    picsStore.emitChange();
                });
                break;

            case REMOVE_PIC:
                picsStore.removePic(action.item).then(function (response) {
                    picsStore.emitChange();
                });
                break;
        }

    });

    //expose only the public interface
    this.addListener = function (l) {
        picsStore.addListener(l);
    };

    this.getPics = function () {
        return picsStore.getPics();
    };

    this.getCurrentPic = function () {
        return picsStore.getCurrentPic();
    };

    this.getErrorMsg = function () {
        return picsStore.getErrorMsg();
    };
});
