"use strict";

var ADD_FEATURE = "ADD_FEATURE";
var REMOVE_FEATURE = "REMOVE_FEATURE";
var SAVE_FEATURE = "SAVE_FEATURE";
var PROJECT_SET = "PROJECT_SET";

class featureActions {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }

    addFeature(item) {
        this.dispatcher.emit({
            actionType: ADD_FEATURE,
            item: item
        });
    }

    removeFeature(item) {
        this.dispatcher.emit({
            actionType: REMOVE_FEATURE,
            item: item
        });
    }

    saveFeature(item) {
        this.dispatcher.emit({
            actionType: SAVE_FEATURE,
            item: item
        });
    }

    projectSet(item) {
        this.dispatcher.emit({
            actionType: PROJECT_SET,
            item: item
        });
    }
}
angular.module("myApp").service("featureActions", featureActions);


class FeatureStore extends EventEmitter {
    constructor(featureService) {
        super();
        this.featureService = featureService;

        this.featurees = [];
        this.errorMsg = "";

        //this.emitChange();
        //console.log("init Feature S T O R E", this);
    }

    getFeatures() {
        return this.featurees;
    }

    getErrorMsg() {
        return this.errorMsg;
    }

    addFeature(feature) {
        var self = this;
        this.errorMsg = "";
        return this.featureService.addItem(feature)
            .then(function (response) {
            }, function (error) {
                if (error.feature > 0) {
                    console.log("addFeature error", error);
                    self.errorMsg = error.feature + ': ' + error.featureText;
                }
            });
    }

    removeFeature(feature) {
        this.errorMsg = "";
        return this.featureService.removeItem(feature);
    }

    saveFeature(feature) {
        this.errorMsg = "";
        return this.featureService.saveItem(feature);
    }

    emitChange() {
        var self = this;
        this.featureService.getItems().then(function (featurees) {
            self.featurees = featurees;
            self.emit("change");
        });
    }

}

angular.module("myApp").service("featureStore", function (dispatcher, featureService) {
    var featureStore = new FeatureStore(featureService);

    dispatcher.addListener(function (action) {
        switch (action.actionType) {
            case ADD_FEATURE:
                featureStore.addFeature(action.item).then(function (response) {
                    featureStore.emitChange();
                });
                break;

            case REMOVE_FEATURE:
                featureStore.removeFeature(action.item).then(function (response) {
                    featureStore.emitChange();
                });
                break;

            case SAVE_FEATURE:
                featureStore.saveFeature(action.item).then(function (response) {
                    featureStore.emitChange();
                });
                break;

            case PROJECT_SET:
                featureStore.emitChange();
                break;

        }


    });

    //expose only the public interface
    this.addListener = function (l) {
        featureStore.addListener(l);
    };

    this.getFeatures = function () {
        return featureStore.getFeatures();
    };

    this.getErrorMsg = function () {
        return featureStore.getErrorMsg();
    };
});


