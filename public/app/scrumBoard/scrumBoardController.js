"use strict";

class ScrumBoardController {
    constructor(MY_SERVER, userStoryStore, userStoryActions) {
        this.url = MY_SERVER.url;
        this.userStoryStore = userStoryStore;
        this.userStoryActions = userStoryActions;
        this.resetStories();

        this.storiesBaseUrl = this.url + "/stories";
        this.thumbnailUrl = this.url + "/thumbnail?id=";
        this.newStory = {};
        this.statuses = ["not started", "in progress", "impeded", "done"];

        var self = this;
        userStoryStore.addListener(function () {
            self.resetStories();
        });

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

}

angular.module("myApp").controller("ScrumBoardController", ScrumBoardController);