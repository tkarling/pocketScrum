"use strict";

class BaseListController {
    constructor() {
    }
}

class FeatureListController extends BaseListController {
    constructor(C, featureStore, featureActions) {
        super();
        this.test = "Hello from FeatureListController";

        this.featureActions = featureActions;
        this.featureStore = featureStore;
        this.resetFeatures();
        featureStore.addListener(() => {
            this.resetFeatures();
        });
    }

    resetFeatures() {
        let setEditedFeature = function(self, id) {
            for(var i = 0; i < self.features.length; i++) {
                if(self.features[i]._id === id) {
                    self.editedFeature = self.features[i];
                    self.editedFeature.editing = true;
                    return;
                }
            }
        }

        this.features = this.featureStore.getFeatures();
        if(this.editedFeatureId) {
            setEditedFeature(this, this.editedFeatureId);
        }
    }

    removeFeature(feature, $event) {
        if(feature._id !== this.editedFeatureId) {
            this.stopEditing();
        }
        this.featureActions.removeFeature(feature);
        if(event){
            event.stopPropagation();
            event.preventDefault();
        }

    }

    stopEditing() {
        if(this.editedFeature) {
            this.featureActions.saveFeature(this.editedFeature);
            this.editedFeatureId = undefined;
        }
    }

    startStopEditing(feature) {
        //console.log(feature.name, this.editedFeature? this.editedFeature.name: undefined);
        this.stopEditing();
        if(! feature.editing) {
            feature.editing = true;
            this.editedFeature = feature;
            this.editedFeatureId = feature._id;
        }
    }
}

angular.module("myApp").controller("FeatureListController", FeatureListController);