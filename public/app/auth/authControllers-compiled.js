"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var BaseUserController = (function () {
    function BaseUserController(MY_SERVER, teamMemberStore) {
        var _this = this;

        _classCallCheck(this, BaseUserController);

        this.MY_SERVER = MY_SERVER;

        this.teamMemberStore = teamMemberStore;
        teamMemberStore.addListener(function () {
            _this.resetAuthUser();
        });
    }

    _createClass(BaseUserController, [{
        key: "resetAuthUser",
        value: function resetAuthUser() {
            this.myInfo = this.teamMemberStore.getAuthUserInfo();
            if (this.myInfo) {
                this.thumbnailUrl = this.myInfo.picId ? this.MY_SERVER.url + this.MY_SERVER.thumbnailWIdUri + this.myInfo.picId : "./images/defaultTeamMember.jpg";
            }
            //console.log("MainController resetAuthUser", this.thumbnailUrl, this.myInfo,
            //    this.myInfo? this.myInfo.picId: "no picId");
        }
    }]);

    return BaseUserController;
})();

var MainController = (function (_BaseUserController) {
    _inherits(MainController, _BaseUserController);

    function MainController(C, MY_SERVER, teamMemberStore, $location) {
        _classCallCheck(this, MainController);

        _get(Object.getPrototypeOf(MainController.prototype), "constructor", this).call(this, MY_SERVER, teamMemberStore);
        this.$location = $location;
    }

    _createClass(MainController, [{
        key: "gotoPage",
        value: function gotoPage(path) {
            //console.log("goto", path);
            this.$location.path(path);
        }
    }]);

    return MainController;
})(BaseUserController);

angular.module("myApp").controller("MainController", MainController);

var AuthUserController = (function (_BaseUserController2) {
    _inherits(AuthUserController, _BaseUserController2);

    function AuthUserController(MY_SERVER, teamMemberStore, teamMemberActions, picsActions, picsStore) {
        var _this2 = this;

        _classCallCheck(this, AuthUserController);

        _get(Object.getPrototypeOf(AuthUserController.prototype), "constructor", this).call(this, MY_SERVER, teamMemberStore);
        this.teamMemberActions = teamMemberActions;
        this.picsActions = picsActions;
        this.test = "AuthUserController test";
        this.resetAuthUser();

        this.picsStore = picsStore;
        picsStore.addListener(function () {
            _this2.resetCurrentPic();
        });
    }

    _createClass(AuthUserController, [{
        key: "resetCurrentPic",
        value: function resetCurrentPic() {
            this.currentPic = this.picsStore.getCurrentPic();
            //console.log("resetCurrentPic", this.currentPic);
            if (this.currentPic._id) {
                this.myInfo.picId = this.currentPic.picId;
                this.saveInfo();
            }
        }
    }, {
        key: "saveInfo",
        value: function saveInfo() {
            if (this.myInfo && this.myInfo._id) {
                this.teamMemberActions.saveTeamMember(this.myInfo);
            }
        }
    }, {
        key: "savePic",
        value: function savePic(pic) {
            this.picsActions.addPic(pic);
        }
    }]);

    return AuthUserController;
})(BaseUserController);

angular.module("myApp").controller("AuthUserController", AuthUserController);

//# sourceMappingURL=authControllers-compiled.js.map