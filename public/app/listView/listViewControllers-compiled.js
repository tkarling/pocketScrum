"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseListController = function BaseListController() {
    _classCallCheck(this, BaseListController);
};

var FeatureListController = (function (_BaseListController) {
    _inherits(FeatureListController, _BaseListController);

    function FeatureListController(C, featureStore, featureActions) {
        var _this = this;

        _classCallCheck(this, FeatureListController);

        _get(Object.getPrototypeOf(FeatureListController.prototype), "constructor", this).call(this);
        this.test = "Hello from FeatureListController";

        this.featureActions = featureActions;
        this.featureStore = featureStore;
        this.resetFeatures();
        featureStore.addListener(function () {
            _this.resetFeatures();
        });
    }

    _createClass(FeatureListController, [{
        key: "resetFeatures",
        value: function resetFeatures() {
            var setEditedFeature = function setEditedFeature(self, id) {
                for (var i = 0; i < self.features.length; i++) {
                    if (self.features[i]._id === id) {
                        self.editedFeature = self.features[i];
                        self.editedFeature.editing = true;
                        return;
                    }
                }
            };

            this.features = this.featureStore.getFeatures();
            if (this.editedFeatureId) {
                setEditedFeature(this, this.editedFeatureId);
            }
        }
    }, {
        key: "removeFeature",
        value: function removeFeature(feature, $event) {
            if (feature._id !== this.editedFeatureId) {
                this.stopEditing();
            }
            this.featureActions.removeFeature(feature);
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
        }
    }, {
        key: "stopEditing",
        value: function stopEditing() {
            if (this.editedFeature) {
                this.featureActions.saveFeature(this.editedFeature);
                this.editedFeatureId = undefined;
            }
        }
    }, {
        key: "startStopEditing",
        value: function startStopEditing(feature) {
            //console.log(feature.name, this.editedFeature? this.editedFeature.name: undefined);
            this.stopEditing();
            if (!feature.editing) {
                feature.editing = true;
                this.editedFeature = feature;
                this.editedFeatureId = feature._id;
            }
        }
    }]);

    return FeatureListController;
})(BaseListController);

angular.module("myApp").controller("FeatureListController", FeatureListController);

//# sourceMappingURL=listViewControllers-compiled.js.map