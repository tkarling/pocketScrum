"use strict";

angular.module("myApp", ["ngRoute", "ngFileUpload", "dragDrop"]);

angular.module("myApp").service("MY_SERVER", function ($location) {
    this.url = "http://" + $location.host() + ":" + $location.port() + "/api/pocketScrum";
}).config(function ($routeProvider) {
    $routeProvider.when("/pictures", {
        templateUrl: "./app/picsList/picsList.html",
        controller: "PicsListController as pictures"
    }).when("/scrumBoard", {
        templateUrl: "./app/scrumBoard/scrumBoard.html",
        controller: "ScrumBoardController as scrumBoard"
    }).otherwise({
        redirectTo: "/scrumBoard"
    });
});

//# sourceMappingURL=app-compiled.js.map