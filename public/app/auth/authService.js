"use strict";

class authService {
    constructor(MY_SERVER, $timeout, $http, $location, teamMemberStore, teamMemberActions) {
        this.MY_SERVER = MY_SERVER;
        this.$timeout = $timeout;
        this.$http = $http;
        this.$location = $location;
        this.teamMemberStore = teamMemberStore;
        this.teamMemberActions = teamMemberActions;
        this.myInfo = {thumbnailUrl: ""};
    }

    resetAuthUser() {
        this.myInfo = this.teamMemberStore.getAuthUserInfo();
        console.log("resetAuthUser", this.myInfo);
    }

    getUserInfo() {
        console.log('authService getUserInfo');
        var self = this;
        //this.$timeout(function() {
        console.log('authService timeout getUserInfo');
        self.$http.get(this.MY_SERVER.url + this.MY_SERVER.meUri).then(function (result) {
            console.log("result", result);
            if (result.data) {
                self.myInfo.id = result.data.id;
                self.myInfo.provider = result.data.provider;
                self.myInfo.displayName = result.data.displayName;
                self.myInfo.thumbnailUrl = self.MY_SERVER.url + self.MY_SERVER.thumbnailWIdUri;
                console.log("this.myInfo", self.myInfo);
                self.teamMemberActions.setAuthUser(self.myInfo);
                self.$location.path(self.MY_SERVER.scrumBoardViewUri);
            }
        }, function (err) {
            self.myInfo.id = undefined;
            self.myInfo.displayName = undefined;
            self.myInfo.thumbnailUrl = undefined;
            console.log("getUserInfo failed", err);
        });
        //}, 500);
    }

    getMyInfo() {
        return this.myInfo;
    }
}

angular.module("myApp").service("authService", authService);
