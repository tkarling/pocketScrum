"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var scrumBoardToolsController = function scrumBoardToolsController() {
    _classCallCheck(this, scrumBoardToolsController);

    this.test = "hello from scrumBoardToolsController";
};

angular.module("myApp").directive("scrumBoardTools", function () {
    return {
        restrict: "E",
        //scope: {
        //    visible: "=",
        //    item: "="
        //},
        controller: scrumBoardToolsController,
        controllerAs: "sbTools",
        templateUrl: "./app/scrumBoard/scrumBoardTools.html"
    };
});

var scrumBoardGroupsController = function scrumBoardGroupsController() {
    _classCallCheck(this, scrumBoardGroupsController);

    this.test = "hello from scrumBoardGroupsController";
};

angular.module("myApp").directive("scrumBoardGroups", function () {
    return {
        restrict: "E",
        controller: scrumBoardGroupsController,
        controllerAs: "sbGroups",
        templateUrl: "./app/scrumBoard/scrumBoardGroups.html"
    };
});

//# sourceMappingURL=scrumBoardDirectives-compiled.js.map