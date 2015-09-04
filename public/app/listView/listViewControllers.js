"use strict";

class BaseListController {
    constructor() {
    }
}

class FeatureListController extends BaseListController {
    constructor(C, featureStore) {
        super();
        this.test = "Hello from FeatureListController";

        this.featureStore = featureStore;
        this.resetFeatures();
        featureStore.addListener(() => {
            this.resetFeatures();
        });
    }

    resetFeatures() {
        this.features = this.featureStore.getFeatures();
    }
}

angular.module("myApp").controller("FeatureListController", FeatureListController);