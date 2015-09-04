"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScrumBoardController = (function () {
    function ScrumBoardController(C, MY_SERVER, statusStore, userStoryStore, userStoryActions, featureStore, teamMemberStore) {
        _classCallCheck(this, ScrumBoardController);

        this.C = C;
        this.url = MY_SERVER.url;
        var self = this;
        this.baseUrl = this.url + "/stories";
        this.thumbnailUrl = this.url + "/thumbnail?id=";
        this.newStory = {};
        this.menuVisible = false;

        this.userStoryStore = userStoryStore;
        this.userStoryActions = userStoryActions;
        this.resetStories();
        userStoryStore.addListener(function () {
            self.resetStories();
        });

        this.statusStore = statusStore;
        this.resetStatuses();
        statusStore.addListener(function () {
            self.resetStatuses();
        });

        this.featureStore = featureStore;
        this.resetFeatures();
        featureStore.addListener(function () {
            self.resetFeatures();
        });

        this.teamMemberStore = teamMemberStore;
        this.resetTeamMembers();
        teamMemberStore.addListener(function () {
            self.resetTeamMembers();
        });
    }

    _createClass(ScrumBoardController, [{
        key: "featureSelected",
        value: function featureSelected() {
            return this.currentFeature && this.currentFeature._id;
        }
    }, {
        key: "resetStatuses",
        value: function resetStatuses() {
            var NO_OF_GROUPS = 4;
            this.statuses = this.statusStore.getStatuses();
            this.statuses.splice(NO_OF_GROUPS, this.statuses.length - NO_OF_GROUPS);
        }
    }, {
        key: "resetFeatures",
        value: function resetFeatures() {
            this.features = this.featureStore.getFeatures();
            this.features.unshift({ name: "All Features", noShow: true });
            this.currentFeature = this.features.currentItem;
        }
    }, {
        key: "resetTeamMembers",
        value: function resetTeamMembers() {
            this.teamMembers = this.teamMemberStore.getTeamMembers();
            this.teamMembers.unshift({ name: "not assigned" });
            this.teamMembers.unshift({ name: "All Team Members", noShow: true });
            this.currentMember = this.teamMembers.currentItem;
        }
    }, {
        key: "resetStories",
        value: function resetStories() {
            this.stories = this.userStoryStore.getStories();
            this.errorMsg = this.userStoryStore.getErrorMsg();
            this.newStory = {};
        }
    }, {
        key: "addStory",
        value: function addStory(story) {
            if (this.newStory.name) {
                this.newStory.feature = this.currentFeature._id;
                this.userStoryActions.addStory(this.newStory);
            }
        }
    }, {
        key: "removeStory",
        value: function removeStory(story, event) {
            this.userStoryActions.removeStory(story);
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
        }
    }, {
        key: "saveStory",
        value: function saveStory(story) {
            this.userStoryActions.saveStory(story);
        }
    }, {
        key: "setStoryFeature",
        value: function setStoryFeature(story, feature) {
            story.feature = feature._id;
            this.userStoryActions.saveStory(story);
        }
    }, {
        key: "setStoryAssignedTo",
        value: function setStoryAssignedTo(story, member) {
            story.assignedTo = member._id;
            this.userStoryActions.saveStory(story);
        }
    }, {
        key: "setDraggedStory",
        value: function setDraggedStory(story) {
            this.draggedStory = story;
        }
    }, {
        key: "setStatus",
        value: function setStatus(status) {
            this.draggedStory.status = status;
            this.userStoryActions.saveStory(this.draggedStory);
            this.draggedStory = undefined;
        }
    }, {
        key: "currentFeatureId",
        get: function get() {
            return this.featureSelected(this) ? this.currentFeature._id : "";
        }
    }, {
        key: "currentMemberId",
        get: function get() {
            var memberSelected = function memberSelected(self) {
                return self.currentMember && self.currentMember._id;
            };

            var notAssigned = function notAssigned(self) {
                return self.currentMember.name === "not assigned";
            };

            return memberSelected(this) ? this.currentMember._id : notAssigned(this) ? null : "";
        }
    }]);

    return ScrumBoardController;
})();

angular.module("myApp").controller("ScrumBoardController", ScrumBoardController);

//# sourceMappingURL=scrumBoardController-compiled.js.map