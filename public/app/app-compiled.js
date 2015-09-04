"use strict";

angular.module("myApp", ["ngRoute", "ngFileUpload", "dragDrop", "visibilityClicker", "defaults"]);

angular.module("myApp").service("MY_SERVER", function ($location) {
    this.url = "http://" + $location.host() + ":" + $location.port() + "/api/pocketScrum";
    this.idSelector = "?id=";
    this.picturesUri = "/designpic";
    this.statusUri = "/status";
    this.membersUri = "/members";
    this.storiesUri = "/stories";
    this.featuresUri = "/features";
    this.projectsUri = "/projects";
    this.meUri = "/me";
    this.scrumBoardViewUri = "/scrumBoard";
    this.picturesViewUri = "/pictures";
    this.thumbnailWIdUri = "/thumbnail?id=";
}).config(function ($routeProvider) {
    $routeProvider.when("/login", {
        templateUrl: "./app/auth/auth.html",
        controller: "AuthController as auth"
    }).when("/pictures", {
        templateUrl: "./app/picsList/picsList.html",
        controller: "PicsListController as pictures"
    }).when("/scrumBoard", {
        templateUrl: "./app/scrumBoard/scrumBoard.html",
        controller: "ScrumBoardController as scrumBoard"
    }).otherwise({
        redirectTo: "/login"
    });
});

//# sourceMappingURL=app-compiled.js.map