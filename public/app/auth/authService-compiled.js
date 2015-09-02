"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var authService = (function () {
    function authService(MY_SERVER, $timeout, $http, $location, teamMemberStore, teamMemberActions) {
        _classCallCheck(this, authService);

        this.MY_SERVER = MY_SERVER;
        this.$timeout = $timeout;
        this.$http = $http;
        this.$location = $location;
        this.teamMemberStore = teamMemberStore;
        this.teamMemberActions = teamMemberActions;
        this.myInfo = { thumbnailUrl: "" };
    }

    _createClass(authService, [{
        key: "resetAuthUser",
        value: function resetAuthUser() {
            this.myInfo = this.teamMemberStore.getAuthUserInfo();
            console.log("resetAuthUser", this.myInfo);
        }
    }, {
        key: "getUserInfo",
        value: function getUserInfo() {
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
    }, {
        key: "getMyInfo",
        value: function getMyInfo() {
            return this.myInfo;
        }
    }]);

    return authService;
})();

angular.module("myApp").service("authService", authService);

//# sourceMappingURL=authService-compiled.js.map