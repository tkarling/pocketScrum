class scrumBoardToolsController {
    constructor() {
        this.test = "hello from scrumBoardToolsController";
    }
}

angular.module("myApp").directive( "scrumBoardTools", function(){
    return {
        restrict: "E",
        //scope: {
        //    visible: "=",
        //    item: "="
        //},
        controller: scrumBoardToolsController,
        controllerAs: "sbTools",
        templateUrl: "./app/scrumBoard/scrumBoardTools.html"
    }
});


class scrumBoardGroupsController {
    constructor() {
        this.test = "hello from scrumBoardGroupsController";
    }
}

angular.module("myApp").directive( "scrumBoardGroups", function(){
    return {
        restrict: "E",
        controller: scrumBoardGroupsController,
        controllerAs: "sbGroups",
        templateUrl: "./app/scrumBoard/scrumBoardGroups.html"
    }
});
