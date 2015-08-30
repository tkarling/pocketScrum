"use strict";

var ADD_STATUS = "ADD_STATUS";
var REMOVE_STATUS = "REMOVE_STATUS";
var SAVE_STATUS = "SAVE_STATUS";

class statusActions {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }

    addStatus(item) {
        this.dispatcher.emit({
            actionType: ADD_STATUS,
            item: item
        });
    }

    removeStatus(item) {
        this.dispatcher.emit({
            actionType: REMOVE_STATUS,
            item: item
        });
    }

    saveStatus(item) {
        this.dispatcher.emit({
            actionType: SAVE_STATUS,
            item: item
        });
    }
}
angular.module("myApp").service("statusActions", statusActions);


class StatusStore extends EventEmitter {
    constructor(statusService) {
        super();
        this.statusService = statusService;

        this.statuses = [];
        this.errorMsg = "";

        this.emitChange();
    }

    getStatuses() {
        return this.statuses;
    }

    getErrorMsg() {
        return this.errorMsg;
    }

    addStatus(status) {
        var self = this;
        this.errorMsg = "";
        return this.statusService.addStatus(status)
            .then(function (response) {
            }, function (error) {
                if (error.status > 0) {
                    console.log("addStatus error", error);
                    self.errorMsg = error.status + ': ' + error.statusText;
                }
            });
    }

    removeStatus(status) {
        this.errorMsg = "";
        return this.statusService.removeStatus(status);
    }

    saveStatus(status) {
        this.errorMsg = "";
        return this.statusService.saveStatus(status);
    }

    emitChange() {
        var self = this;
        this.statusService.getStatuses().then(function (statuses) {
            self.statuses = statuses;
            self.emit("change");
        });
    }

}

angular.module("myApp").service("statusStore", function (dispatcher, statusService) {
    var statusStore = new StatusStore(statusService);

    dispatcher.addListener(function (action) {
        switch (action.actionType) {
            case ADD_STATUS:
                statusStore.addStatus(action.item).then(function (response) {
                    statusStore.emitChange();
                });
                break;

            case REMOVE_STATUS:
                statusStore.removeStatus(action.item).then(function (response) {
                    statusStore.emitChange();
                });
                break;

            case SAVE_STATUS:
                statusStore.saveStatus(action.item).then(function (response) {
                    statusStore.emitChange();
                });
                break;

        }


    });

    //expose only the public interface
    this.addListener = function (l) {
        statusStore.addListener(l);
    };

    this.getStatuses = function () {
        return statusStore.getStatuses();
    };

    this.getErrorMsg = function () {
        return statusStore.getErrorMsg();
    };
});

