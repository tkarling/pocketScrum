"use strict";

angular.module("myApp", ["ngRoute"]);

angular.module("myApp")
    .config(function($routeProvider) {
        $routeProvider
            .when("/picsList", {
                templateUrl: "./app/picsList/picsList.html",
                controller: "PicsListController as pictures"
            })
            .otherwise({
                redirectTo: "/picsList"
            });

    });
