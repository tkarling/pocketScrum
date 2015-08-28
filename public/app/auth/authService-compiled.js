"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var authService = (function () {
    function authService(MY_SERVER, $timeout, $http, $location) {
        _classCallCheck(this, authService);

        this.url = MY_SERVER.url;
        this.$timeout = $timeout;
        this.$http = $http;
        this.$location = $location;
        this.myInfo = { thumbnailUrl: "" };
    }

    _createClass(authService, [{
        key: "getUserInfo",
        value: function getUserInfo() {
            console.log('authService getUserInfo');
            var self = this;
            //this.$timeout(function() {
            console.log('authService timeout getUserInfo');
            self.$http.get("http://localhost:3039/api/pocketScrum/me").then(function (result) {
                console.log("result", result);
                if (result.data) {
                    self.myInfo.id = result.data.id;
                    self.myInfo.displayName = result.data.displayName;
                    self.myInfo.thumbnailUrl = self.url + "/thumbnail?id=";
                    console.log("this.myInfo", self.myInfo);
                    self.$location.path("/scrumBoard");
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