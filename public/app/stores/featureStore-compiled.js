"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ADD_FEATURE = "ADD_FEATURE";
var REMOVE_FEATURE = "REMOVE_FEATURE";
var SAVE_FEATURE = "SAVE_FEATURE";

var featureActions = (function () {
    function featureActions(dispatcher) {
        _classCallCheck(this, featureActions);

        this.dispatcher = dispatcher;
    }

    _createClass(featureActions, [{
        key: "addFeature",
        value: function addFeature(item) {
            this.dispatcher.emit({
                actionType: ADD_FEATURE,
                item: item
            });
        }
    }, {
        key: "removeFeature",
        value: function removeFeature(item) {
            this.dispatcher.emit({
                actionType: REMOVE_FEATURE,
                item: item
            });
        }
    }, {
        key: "saveFeature",
        value: function saveFeature(item) {
            this.dispatcher.emit({
                actionType: SAVE_FEATURE,
                item: item
            });
        }
    }]);

    return featureActions;
})();

angular.module("myApp").service("featureActions", featureActions);

var FeatureStore = (function (_EventEmitter) {
    _inherits(FeatureStore, _EventEmitter);

    function FeatureStore(featureService) {
        _classCallCheck(this, FeatureStore);

        _get(Object.getPrototypeOf(FeatureStore.prototype), "constructor", this).call(this);
        this.featureService = featureService;

        this.featurees = [];
        this.errorMsg = "";

        this.emitChange();
    }

    _createClass(FeatureStore, [{
        key: "getFeatures",
        value: function getFeatures() {
            return this.featurees;
        }
    }, {
        key: "getErrorMsg",
        value: function getErrorMsg() {
            return this.errorMsg;
        }
    }, {
        key: "addFeature",
        value: function addFeature(feature) {
            var self = this;
            this.errorMsg = "";
            return this.featureService.addItem(feature).then(function (response) {}, function (error) {
                if (error.feature > 0) {
                    console.log("addFeature error", error);
                    self.errorMsg = error.feature + ': ' + error.featureText;
                }
            });
        }
    }, {
        key: "removeFeature",
        value: function removeFeature(feature) {
            this.errorMsg = "";
            return this.featureService.removeItem(feature);
        }
    }, {
        key: "saveFeature",
        value: function saveFeature(feature) {
            this.errorMsg = "";
            return this.featureService.saveItem(feature);
        }
    }, {
        key: "emitChange",
        value: function emitChange() {
            var self = this;
            this.featureService.getItems().then(function (featurees) {
                self.featurees = featurees;
                self.emit("change");
            });
        }
    }]);

    return FeatureStore;
})(EventEmitter);

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

//# sourceMappingURL=featureStore-compiled.js.map