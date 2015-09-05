"use strict";

var ADD_TEAM_MEMBER = "ADD_TEAM_MEMBER";
var REMOVE_TEAM_MEMBER = "REMOVE_TEAM_MEMBER";
var SAVE_TEAM_MEMBER = "SAVE_TEAM_MEMBER";
var SET_AUTH_USER = "SET_AUTH_USER";
var PROJECT_SET = "PROJECT_SET";

class teamMemberActions {
    constructor(dispatcher, userStoryActions) {
        this.dispatcher = dispatcher;
        this.userStoryActions = userStoryActions;
    }

    addTeamMember(item) {
        this.dispatcher.emit({
            actionType: ADD_TEAM_MEMBER,
            item: item
        });
    }

    removeTeamMember(item) {
        this.dispatcher.emit({
            actionType: REMOVE_TEAM_MEMBER,
            item: item
        });
    }

    saveTeamMember(item) {
        this.dispatcher.emit({
            actionType: SAVE_TEAM_MEMBER,
            item: item
        });
        this.userStoryActions.projectSet();
    }

    setAuthUser(item) {
        this.dispatcher.emit({
            actionType: SET_AUTH_USER,
            item: item
        });
    }

    projectSet(item) {
        this.dispatcher.emit({
            actionType: PROJECT_SET,
            item: item
        });
    }
}
angular.module("myApp").service("teamMemberActions", teamMemberActions);


class TeamMemberStore extends EventEmitter {
    constructor(teamMemberService, $log) {
        super();
        this.$log = $log;
        this.teamMemberService = teamMemberService;

        this.teamMembers = [];
        this.authUserInfo = undefined;
        this.errorMsg = "";

        console.log("init TeamMember S T O R E", this);

    }

    getTeamMembers() {
        return this.teamMembers;
    }

    getErrorMsg() {
        return this.errorMsg;
    }

    addTeamMember(teamMember) {
        var self = this;
        this.errorMsg = "";
        return this.teamMemberService.addItem(teamMember)
            .then(function (response) {
            }, function (error) {
                if (error.teamMember > 0) {
                    this.$log.error("addTeamMember error", error);
                    self.errorMsg = error.teamMember + ': ' + error.teamMemberText;
                }
            });
    }

    removeTeamMember(teamMember) {
        this.errorMsg = "";
        return this.teamMemberService.removeItem(teamMember);
    }

    saveTeamMember(teamMember) {
        this.errorMsg = "";
        return this.teamMemberService.saveItem(teamMember);
    }

    setAuthUser(authInfo) {
        return this.teamMemberService.getItem("authId", authInfo.id).then((member) => {
            if(member === null) {
                var newMember = {
                    authId: authInfo.id,
                    authProvider: authInfo.provider,
                    name: authInfo.displayName
                };
                return this.teamMemberService.addItem(newMember).then((addedMember) => {
                    this.authUserInfo = addedMember;
                }, (err) => {
                    this.$log.error("error adding member", err);
                    this.authUserInfo = undefined;
                });
            } else {
                this.authUserInfo = member;
            }
        }, (err) => {
            this.$log.error("error getting auth user info", err);
            this.authUserInfo = undefined;
        });
    }

    emitChange() {
        var self = this;
        this.teamMemberService.getItems().then(function (teamMembers) {
            self.teamMembers = teamMembers;
            self.emit("change");
        });
    }

}

angular.module("myApp").service("teamMemberStore", function ($log, dispatcher, teamMemberService) {
    var teamMemberStore = new TeamMemberStore(teamMemberService, $log);

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

            case PROJECT_SET:
                teamMemberStore.emitChange();
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

    this.getAuthUserInfo = function() {
        return teamMemberStore.authUserInfo;
    }
});


