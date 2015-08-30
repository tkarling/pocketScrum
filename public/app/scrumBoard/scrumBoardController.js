"use strict";

class ScrumBoardController {
    constructor(MY_SERVER, userStoryStore, userStoryActions, statusStore) {
        this.url = MY_SERVER.url;

        this.userStoryStore = userStoryStore;
        this.userStoryActions = userStoryActions;
        this.resetStories();
        var self = this;
        statusStore.addListener(function () {
            self.resetStatuses();
        });

        this.statusStore = statusStore;
        this.resetStatuses ();
        var self = this;
        userStoryStore.addListener(function () {
            self.resetStories();
        });

        this.baseUrl = this.url + "/stories";
        this.thumbnailUrl = this.url + "/thumbnail?id=";
        this.newStory = {};
    }

    resetStatuses () {
        var NO_OF_GROUPS = 4;
        this.statuses = this.statusStore.getStatuses();
        this.statuses.splice(NO_OF_GROUPS, this.statuses.length - NO_OF_GROUPS);
    }

    resetStories() {
        this.stories = this.userStoryStore.getStories();
        this.errorMsg = this.userStoryStore.getErrorMsg();
    }

    addStory(story) {
        if(this.newStory.name) {
            this.newStory.status = "not started";
            this.userStoryActions.addStory(this.newStory);
            this.newStory = {};
        }
    }

    removeStory(story, event) {
        this.userStoryActions.removeStory(story);
        if(event){
            event.stopPropagation();
            event.preventDefault();
        }
    }

    editStory(story) {

    }

    setDraggedStory(story) {
        this.draggedStory = story;
    }



    setStatus(status) {
        this.draggedStory.status = status;
        this.userStoryActions.saveStory(this.draggedStory);
        this.draggedStory = undefined;
    }


}

angular.module("myApp").controller("ScrumBoardController", ScrumBoardController);