"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScrumBoardController = (function () {
    function ScrumBoardController(MY_SERVER, userStoryStore, userStoryActions, statusStore) {
        _classCallCheck(this, ScrumBoardController);

        this.url = MY_SERVER.url;

        this.userStoryStore = userStoryStore;
        this.userStoryActions = userStoryActions;
        this.resetStories();
        var self = this;
        statusStore.addListener(function () {
            self.resetStatuses();
        });

        this.statusStore = statusStore;
        this.resetStatuses();
        var self = this;
        userStoryStore.addListener(function () {
            self.resetStories();
        });

        this.storiesBaseUrl = this.url + "/stories";
        this.thumbnailUrl = this.url + "/thumbnail?id=";
        this.newStory = {};
    }

    _createClass(ScrumBoardController, [{
        key: "resetStatuses",
        value: function resetStatuses() {
            var NO_OF_GROUPS = 4;
            this.statuses = this.statusStore.getStatuses();
            this.statuses.splice(NO_OF_GROUPS, this.statuses.length - NO_OF_GROUPS);
        }
    }, {
        key: "resetStories",
        value: function resetStories() {
            this.stories = this.userStoryStore.getStories();
            this.errorMsg = this.userStoryStore.getErrorMsg();
        }
    }, {
        key: "addStory",
        value: function addStory(story) {
            if (this.newStory.name) {
                this.newStory.status = "not started";
                this.userStoryActions.addStory(this.newStory);
                this.newStory = {};
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
        key: "editStory",
        value: function editStory(story) {}
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
    }]);

    return ScrumBoardController;
})();

angular.module("myApp").controller("ScrumBoardController", ScrumBoardController);

//# sourceMappingURL=scrumBoardController-compiled.js.map