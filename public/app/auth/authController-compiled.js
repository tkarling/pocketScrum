"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthController = (function () {
    function AuthController(authService) {
        _classCallCheck(this, AuthController);

        this.test = "AuthController test";
        this.authService = authService;
        this.authService.getUserInfo();
    }

    _createClass(AuthController, [{
        key: "getUserInfo",
        value: function getUserInfo() {
            console.log('AuthController getUserInfo');
            this.authService.getUserInfo();
        }
    }]);

    return AuthController;
})();

angular.module("myApp").controller("AuthController", AuthController);

var MainController = (function () {
    function MainController($location, authService) {
        _classCallCheck(this, MainController);

        this.test = "MainController test";
        this.$location = $location;
        this.authService = authService;
        this.myInfo = authService.getMyInfo();
    }

    _createClass(MainController, [{
        key: "updateThumbnail",
        value: function updateThumbnail() {
            console.log("updateThumbnail");
            var thumbnailUrlBase = this.authService.getMyInfo().thumbnailUrl;
            this.thumbnailUrl = thumbnailUrlBase ? thumbnailUrlBase + "55dd009fa2909451656e9114" : "";
        }
    }, {
        key: "gotoPage",
        value: function gotoPage(path) {
            console.log("goto", path);
            this.$location.path(path);
        }
    }]);

    return MainController;
})();

angular.module("myApp").controller("MainController", MainController);

//# sourceMappingURL=authController-compiled.js.map