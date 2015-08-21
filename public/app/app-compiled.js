"use strict";

angular.module("myApp", ["ngRoute", "ngFileUpload"]);

angular.module("myApp").service("MY_SERVER", function ($location) {
    this.url = "http://" + $location.host() + ":" + $location.port() + "/api/pocketScrum";
}).config(function ($routeProvider) {
    $routeProvider.when("/picsList", {
        templateUrl: "./app/picsList/picsList.html",
        controller: "PicsListController as pictures"
    }).otherwise({
        redirectTo: "/picsList"
    });
});

//# sourceMappingURL=app-compiled.js.map