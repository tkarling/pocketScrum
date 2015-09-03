"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

var scrumBoardGroupsController = (function () {
    function scrumBoardGroupsController(C) {
        _classCallCheck(this, scrumBoardGroupsController);

        this.C = C;
        this.test = "hello from scrumBoardGroupsController";
    }

    _createClass(scrumBoardGroupsController, [{
        key: "showDefaultImage",
        value: function showDefaultImage(story) {
            return story.assignedTo && !story.assignedTo.picId && story.assignedTo._id !== this.C.NOT_SET_MEMBER_ID;
        }
    }]);

    return scrumBoardGroupsController;
})();

angular.module("myApp").directive("scrumBoardGroups", function () {
    return {
        restrict: "E",
        controller: scrumBoardGroupsController,
        controllerAs: "sbGroups",
        templateUrl: "./app/scrumBoard/scrumBoardGroups.html"
    };
});

//# sourceMappingURL=scrumBoardDirectives-compiled.js.map