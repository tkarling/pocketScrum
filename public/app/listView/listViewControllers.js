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
        this.features = this.featureStore.getFeatures();
    }

    removeFeature(feature, $event) {
        this.featureActions.removeFeature(feature);
        if(event){
            event.stopPropagation();
            event.preventDefault();
        }

    }
}

angular.module("myApp").controller("FeatureListController", FeatureListController);