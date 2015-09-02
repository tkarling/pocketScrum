"use strict";

class AuthController {
    constructor(authService) {
        this.test = "AuthController test";
        this.authService = authService;
    }

    getAuthInfo() {
        this.authService.getAuthInfo();
    }
}


angular.module("myApp").controller("AuthController", AuthController);


class MainController {
    constructor(MY_SERVER, $location, teamMemberStore) {
        this.MY_SERVER = MY_SERVER;
        this.$location = $location;

        this.teamMemberStore = teamMemberStore;
        teamMemberStore.addListener(() => {
            this.resetAuthUser();
        });
    }

    resetAuthUser() {
        this.myInfo = this.teamMemberStore.getAuthUserInfo();
        if(this.myInfo) {
            this.thumbnailUrl  = this.MY_SERVER.url + this.MY_SERVER.thumbnailWIdUri +
                this.myInfo.picId;
        }
        //console.log("MainController resetAuthUser", this.thumbnailUrl, this.myInfo);
    }

    gotoPage(path) {
        //console.log("goto", path);
        this.$location.path(path);
    }

}


angular.module("myApp").controller("MainController", MainController);