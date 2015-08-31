"use strict";

angular.module("myApp", ["ngRoute", "ngFileUpload", "dragDrop", "contextMenu"]);

angular.module("myApp")
    .service("MY_SERVER", function($location) {
        this.url = "http://" + $location.host() + ":" + $location.port() + "/api/pocketScrum";
    })
    .service("C", function() {
        this.ALL_FEATURE_ID = "55e39e8e592f87ef2f78cf35";
    })
    .config(function($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "./app/auth/auth.html",
                controller: "AuthController as auth"
            })
            .when("/pictures", {
                templateUrl: "./app/picsList/picsList.html",
                controller: "PicsListController as pictures"
            })
            .when("/scrumBoard", {
                templateUrl: "./app/scrumBoard/scrumBoard.html",
                controller: "ScrumBoardController as scrumBoard"
            })
            .otherwise({
                redirectTo: "/login"
            });

    });
