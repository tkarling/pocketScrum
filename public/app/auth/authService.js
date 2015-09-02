"use strict";

class authService {
    constructor(MY_SERVER,  $http, $location, teamMemberStore, teamMemberActions) {
        this.MY_SERVER = MY_SERVER;
        this.$http = $http;
        this.$location = $location;
        this.teamMemberActions = teamMemberActions;

        //this.teamMemberStore = teamMemberStore;
        //teamMemberStore.addListener(() => {
        //    this.resetAuthUser();
        //});
    }

    //resetAuthUser() {
    //    this.myInfo = this.teamMemberStore.getAuthUserInfo();
    //    console.log("resetAuthUser", this.myInfo);
    //}

    getAuthInfo() {
        console.log('authService getAuthInfo');
        var self = this;
        //console.log('authService timeout getAuthInfo');
        self.$http.get(this.MY_SERVER.url + this.MY_SERVER.meUri).then(function (result) {
            console.log("result", result);
            if (result.data) {
                var authInfo = {
                    id: result.data.id,
                    provider: result.data.provider,
                    displayName: result.data.displayName
                }
                //console.log("authInfo", authInfo);
                self.teamMemberActions.setAuthUser(authInfo);
                self.$location.path(self.MY_SERVER.scrumBoardViewUri);
            }
        }, function (err) {
            console.log("getAuthInfo failed", err);
        });
    }

}

angular.module("myApp").service("authService", authService);
