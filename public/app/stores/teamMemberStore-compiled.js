"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ADD_TEAM_MEMBER = "ADD_TEAM_MEMBER";
var REMOVE_TEAM_MEMBER = "REMOVE_TEAM_MEMBER";
var SAVE_TEAM_MEMBER = "SAVE_TEAM_MEMBER";
var SET_AUTH_USER = "SET_AUTH_USER";

var teamMemberActions = (function () {
    function teamMemberActions(dispatcher) {
        _classCallCheck(this, teamMemberActions);

        this.dispatcher = dispatcher;
    }

    _createClass(teamMemberActions, [{
        key: "addTeamMember",
        value: function addTeamMember(item) {
            this.dispatcher.emit({
                actionType: ADD_TEAM_MEMBER,
                item: item
            });
        }
    }, {
        key: "removeTeamMember",
        value: function removeTeamMember(item) {
            this.dispatcher.emit({
                actionType: REMOVE_TEAM_MEMBER,
                item: item
            });
        }
    }, {
        key: "saveTeamMember",
        value: function saveTeamMember(item) {
            this.dispatcher.emit({
                actionType: SAVE_TEAM_MEMBER,
                item: item
            });
        }
    }, {
        key: "setAuthUser",
        value: function setAuthUser(item) {
            this.dispatcher.emit({
                actionType: SET_AUTH_USER,
                item: item
            });
        }
    }]);

    return teamMemberActions;
})();

angular.module("myApp").service("teamMemberActions", teamMemberActions);

var TeamMemberStore = (function (_EventEmitter) {
    _inherits(TeamMemberStore, _EventEmitter);

    function TeamMemberStore(teamMemberService, C, $log) {
        _classCallCheck(this, TeamMemberStore);

        _get(Object.getPrototypeOf(TeamMemberStore.prototype), "constructor", this).call(this);
        this.$log = $log;
        this.C = C;
        this.teamMemberService = teamMemberService;

        this.teamMembers = [];
        this.authUserInfo = undefined;
        this.errorMsg = "";

        this.emitChange();
    }

    _createClass(TeamMemberStore, [{
        key: "getTeamMembers",
        value: function getTeamMembers() {
            return this.teamMembers;
        }
    }, {
        key: "getErrorMsg",
        value: function getErrorMsg() {
            return this.errorMsg;
        }
    }, {
        key: "addTeamMember",
        value: function addTeamMember(teamMember) {
            var self = this;
            this.errorMsg = "";
            return this.teamMemberService.addItem(teamMember).then(function (response) {}, function (error) {
                if (error.teamMember > 0) {
                    this.$log.error("addTeamMember error", error);
                    self.errorMsg = error.teamMember + ': ' + error.teamMemberText;
                }
            });
        }
    }, {
        key: "removeTeamMember",
        value: function removeTeamMember(teamMember) {
            this.errorMsg = "";
            return this.teamMemberService.removeItem(teamMember);
        }
    }, {
        key: "saveTeamMember",
        value: function saveTeamMember(teamMember) {
            this.errorMsg = "";
            return this.teamMemberService.saveItem(teamMember);
        }
    }, {
        key: "setAuthUser",
        value: function setAuthUser(authInfo) {
            var _this = this;

            return this.teamMemberService.getItem("authId", authInfo.id).then(function (member) {
                if (member === null) {
                    var newMember = {
                        authId: authInfo.id,
                        authProvider: authInfo.provider,
                        name: authInfo.displayName,
                        currentProject: _this.C.DEFAULT_PROJECT_ID
                    };
                    if (_this.C.DEFAULT_MEMBER_PIC_ID) {
                        newMember.picId = _this.C.DEFAULT_MEMBER_PIC_ID;
                    }
                    return _this.teamMemberService.addItem(newMember).then(function (addedMember) {
                        _this.authUserInfo = addedMember;
                    }, function (err) {
                        _this.$log.error("error adding member", err);
                        _this.authUserInfo = undefined;
                        //deferred.reject(err);
                    });
                } else {
                        _this.authUserInfo = member;
                    }
            }, function (err) {
                _this.$log.error("error getting auth user info", err);
                _this.authUserInfo = undefined;
            });
        }
    }, {
        key: "emitChange",
        value: function emitChange() {
            var self = this;
            this.teamMemberService.getItems().then(function (teamMembers) {
                self.teamMembers = teamMembers;
                self.emit("change");
            });
        }
    }]);

    return TeamMemberStore;
})(EventEmitter);

angular.module("myApp").service("teamMemberStore", function ($log, C, dispatcher, teamMemberService) {
    var teamMemberStore = new TeamMemberStore(teamMemberService, C, $log);

    dispatcher.addListener(function (action) {
        switch (action.actionType) {
            case ADD_TEAM_MEMBER:
                teamMemberStore.addTeamMember(action.item).then(function (response) {
                    teamMemberStore.emitChange();
                });
                break;

            case REMOVE_TEAM_MEMBER:
                teamMemberStore.removeTeamMember(action.item).then(function (response) {
                    teamMemberStore.emitChange();
                });
                break;

            case SAVE_TEAM_MEMBER:
                teamMemberStore.saveTeamMember(action.item).then(function (response) {
                    teamMemberStore.emitChange();
                });
                break;

            case SET_AUTH_USER:
                //teamMemberStore.setAuthUser(action.item);
                teamMemberStore.setAuthUser(action.item).then(function (response) {
                    teamMemberStore.emitChange();
                });
                break;
        }
    });

    //expose only the public interface
    this.addListener = function (l) {
        teamMemberStore.addListener(l);
    };

    this.getTeamMembers = function () {
        return teamMemberStore.getTeamMembers();
    };

    this.getErrorMsg = function () {
        return teamMemberStore.getErrorMsg();
    };

    this.getAuthUserInfo = function () {
        return teamMemberStore.authUserInfo;
    };
});

//# sourceMappingURL=teamMemberStore-compiled.js.map