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


class BaseUserController {
    constructor(MY_SERVER,  teamMemberStore) {
        this.MY_SERVER = MY_SERVER;

        this.teamMemberStore = teamMemberStore;
        teamMemberStore.addListener(() => {
            this.resetAuthUser();
        });
    }

    resetAuthUser() {
        this.myInfo = this.teamMemberStore.getAuthUserInfo();
        if(this.myInfo) {
            this.thumbnailUrl  = this.myInfo.picId ? this.MY_SERVER.url + this.MY_SERVER.thumbnailWIdUri +
                this.myInfo.picId : "./images/defaultTeamMember.jpg";
        }
        //console.log("MainController resetAuthUser", this.thumbnailUrl, this.myInfo,
        //    this.myInfo? this.myInfo.picId: "no picId");
    }


}

class MainController extends BaseUserController {
    constructor(C, MY_SERVER,  teamMemberStore, $location) {
        super(MY_SERVER, teamMemberStore);
        this.$location = $location;
    }

    gotoPage(path) {
        //console.log("goto", path);
        this.$location.path(path);
    }

}

angular.module("myApp").controller("MainController", MainController);


class AuthUserController extends BaseUserController {
    constructor(MY_SERVER,  teamMemberStore, teamMemberActions, picsActions, picsStore) {
        super(MY_SERVER,  teamMemberStore);
        this.teamMemberActions = teamMemberActions;
        this.picsActions = picsActions;
        this.test = "AuthUserController test";
        this.resetAuthUser();

        this.picsStore = picsStore;
        picsStore.addListener(() => {
            this.resetCurrentPic();
        });
    }

    resetCurrentPic() {
        this.currentPic = this.picsStore.getCurrentPic();
        //console.log("resetCurrentPic", this.currentPic);
        if(this.currentPic._id && this.savePlease) {
            this.myInfo.picId = this.currentPic.picId;
            this.saveInfo();
            this.savePlease = undefined;
        }
    }

    saveInfo() {
        if(this.myInfo && this.myInfo._id) {
            this.teamMemberActions.saveTeamMember(this.myInfo);
        }
    }

    savePic(pic) {
        this.savePlease = true;
        this.picsActions.addPic(pic);
    }
}


angular.module("myApp").controller("AuthUserController", AuthUserController);