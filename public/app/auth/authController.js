"use strict";

class AuthController {
    constructor(authService) {
        this.test = "AuthController test";
        this.authService = authService;
        //this.authService.getUserInfo();
    }

    getUserInfo() {
        console.log('AuthController getUserInfo');
        this.authService.getUserInfo();
    }
}


angular.module("myApp").controller("AuthController", AuthController);


class MainController {
    constructor($location, authService) {
        this.test = "MainController test";
        this.$location = $location;
        this.authService = authService;
        this.myInfo = authService.getMyInfo();
    }

    updateThumbnail() {
        console.log("updateThumbnail");
        var thumbnailUrlBase = this.authService.getMyInfo().thumbnailUrl;
        this.thumbnailUrl = thumbnailUrlBase ? thumbnailUrlBase + "55dd009fa2909451656e9114": "";
    }

    gotoPage(path) {
        console.log("goto", path);
        this.$location.path(path);
    }

}


angular.module("myApp").controller("MainController", MainController);