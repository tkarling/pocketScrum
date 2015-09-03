"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthController = (function () {
    function AuthController(authService) {
        _classCallCheck(this, AuthController);

        this.test = "AuthController test";
        this.authService = authService;
    }

    _createClass(AuthController, [{
        key: "getAuthInfo",
        value: function getAuthInfo() {
            this.authService.getAuthInfo();
        }
    }]);

    return AuthController;
})();

angular.module("myApp").controller("AuthController", AuthController);

var MainController = (function () {
    function MainController(MY_SERVER, $location, teamMemberStore) {
        var _this = this;

        _classCallCheck(this, MainController);

        this.MY_SERVER = MY_SERVER;
        this.$location = $location;

        this.teamMemberStore = teamMemberStore;
        teamMemberStore.addListener(function () {
            _this.resetAuthUser();
        });
    }

    _createClass(MainController, [{
        key: "resetAuthUser",
        value: function resetAuthUser() {
            this.myInfo = this.teamMemberStore.getAuthUserInfo();
            if (this.myInfo) {
                this.thumbnailUrl = this.myInfo.picId ? this.MY_SERVER.url + this.MY_SERVER.thumbnailWIdUri + this.myInfo.picId : "./images/defaultTeamMember.jpg";
            }
            //console.log("MainController resetAuthUser", this.thumbnailUrl, this.myInfo,
            //    this.myInfo? this.myInfo.picId: "no picId");
        }
    }, {
        key: "gotoPage",
        value: function gotoPage(path) {
            //console.log("goto", path);
            this.$location.path(path);
        }
    }]);

    return MainController;
})();

angular.module("myApp").controller("MainController", MainController);

//# sourceMappingURL=authController-compiled.js.map