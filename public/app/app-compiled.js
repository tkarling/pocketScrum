"use strict";

angular.module("myApp", ["ngRoute", "ngFileUpload", "dragDrop", "visibilityClicker"]);

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
}).service("C", function () {
    this.ALL_FEATURES_ID = "55e39e8e592f87ef2f78cf35";
    this.ALL_MEMBERS_ID = "55e48a940fde1bd55c316cf4";
    this.NOT_SET_MEMBER_ID = "55e48b010fde1bd55c316cf6";
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