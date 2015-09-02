"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var authService = (function () {
    function authService(MY_SERVER, $http, $location, teamMemberStore, teamMemberActions) {
        _classCallCheck(this, authService);

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

    _createClass(authService, [{
        key: "getAuthInfo",
        value: function getAuthInfo() {
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
                    };
                    //console.log("authInfo", authInfo);
                    self.teamMemberActions.setAuthUser(authInfo);
                    self.$location.path(self.MY_SERVER.scrumBoardViewUri);
                }
            }, function (err) {
                console.log("getAuthInfo failed", err);
            });
        }
    }]);

    return authService;
})();

angular.module("myApp").service("authService", authService);

//# sourceMappingURL=authService-compiled.js.map