"use strict";

var ADD_PIC = "ADD_PIC";
var REMOVE_PIC = "REMOVE_PIC";

class picsActions {
    constructor() {
    }

    addPic(item) {
        dispatcher.emit({
            actionType: ADD_PIC,
            item: item
        });
    }

    removePic(item) {
        dispatcher.emit({
            actionType: REMOVE_PIC,
            item: item
        });
    }
}
angular.module("myApp").service("picsActions", picsActions);


class PicsStore extends EventEmitter {
    constructor() {
        super();
        this.pics = [];
    }

    getPics() {
        return this.pics;
    }

    addPic(pic) {
        this.pics.push({qty: 1, pic: pic});
    }

    removePic(pic) {
        var index = this.pics.indexOf(pic);
        this.pics.splice(index, 1);
    }

    emitChange() {
        this.emit("change");
    }
}

angular.module("myApp").service("picsStore", function (dispatcher) {
    var picsStore = new PicsStore();

    dispatcher.addListener(function (action) {
        switch(action.actionType){
            case ADD_PIC:
                picsStore.addPic(action.item);
                picsStore.emitChange();
                break;

            case REMOVE_PIC:
                picsStore.removePic(action.item);
                picsStore.emitChange();
                break;
        }

    });

    //expose only the public interface
    this.addListener = function(l) {
            picsStore.addListener(l);
    };

    this.getPics = function() {
            return picsStore.getPics();
    };
});
