"use strict";

class authService {
    constructor(MY_SERVER, $timeout, $http, $location) {
        this.url = MY_SERVER.url;
        this.$timeout = $timeout;
        this.$http = $http;
        this.$location = $location;
        this.myInfo = {thumbnailUrl: ""};
    }

    getUserInfo() {
        console.log('authService getUserInfo');
        var self = this;
        //this.$timeout(function() {
            console.log('authService timeout getUserInfo');
            self.$http.get("http://localhost:3039/api/pocketScrum/me").then(function(result) {
                console.log("result", result);
                if(result.data) {
                    self.myInfo.id = result.data.id;
                    self.myInfo.displayName = result.data.displayName;
                    self.myInfo.thumbnailUrl = self.url + "/thumbnail?id=";
                    console.log("this.myInfo", self.myInfo);
                    self.$location.path("/scrumBoard");
                }
            }, function(err) {
                self.myInfo.id = undefined;
                self.myInfo.displayName = undefined;
                self.myInfo.thumbnailUrl = undefined;
                console.log("getUserInfo failed", err);
            });
        //}, 500);
    }

    getMyInfo () {
        return this.myInfo;
    }
}

angular.module("myApp").service("authService", authService);
