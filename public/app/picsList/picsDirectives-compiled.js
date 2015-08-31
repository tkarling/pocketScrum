"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var picsToolsController = function picsToolsController() {
    _classCallCheck(this, picsToolsController);

    this.test = "hello from picsToolsController";
};

angular.module("myApp").directive("picsTools", function () {
    return {
        restrict: "E",
        controller: picsToolsController,
        controllerAs: "picsTools",
        templateUrl: "./app/picsList/picsTools.html"
    };
});

var picsGridController = function picsGridController() {
    _classCallCheck(this, picsGridController);

    this.test = "hello from picsGridController";
};

angular.module("myApp").directive("picsGrid", function () {
    return {
        restrict: "E",
        controller: picsGridController,
        controllerAs: "picsGrid",
        templateUrl: "./app/picsList/picsGrid.html"
    };
});

var picDetailsController = function picDetailsController() {
    _classCallCheck(this, picDetailsController);

    this.test = "hello from picDetailsController";
};

angular.module("myApp").directive("picDetails", function () {
    return {
        restrict: "E",
        controller: picDetailsController,
        controllerAs: "picDetails",
        templateUrl: "./app/picsList/picDetails.html"
    };
});

//# sourceMappingURL=picsDirectives-compiled.js.map