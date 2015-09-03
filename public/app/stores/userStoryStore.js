"use strict";

var ADD_STORY = "ADD_STORY";
var REMOVE_STORY = "REMOVE_STORY";
var SAVE_STORY = "SAVE_STORY";

class userStoryActions {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }

    addStory(item) {
        this.dispatcher.emit({
            actionType: ADD_STORY,
            item: item
        });
    }

    removeStory(item) {
        this.dispatcher.emit({
            actionType: REMOVE_STORY,
            item: item
        });
    }

    saveStory(item) {
        this.dispatcher.emit({
            actionType: SAVE_STORY,
            item: item
        });
    }
}
angular.module("myApp").service("userStoryActions", userStoryActions);


class UserStoryStore extends EventEmitter {
    constructor(userStoryService, C) {
        super();
        this.C = C;
        this.userStoryService = userStoryService;

        this.stories = [];
        this.errorMsg = "";

        this.emitChange();
    }

    getStories() {
        return this.stories;
    }

    getErrorMsg() {
        return this.errorMsg;
    }

    addStory(story) {
        var self = this;
        story.status = this.C.NOT_STARTED_STATUS_ID;
        story.assignedTo = this.C.NOT_SET_MEMBER_ID;
        this.errorMsg = "";
        return this.userStoryService.addItem(story)
            .then(function (response) {
            }, function (error) {
                if (error.status > 0) {
                    console.log("addItem error", error);
                    self.errorMsg = error.status + ': ' + error.statusText;
                }
            });
    }

    removeStory(story) {
        this.errorMsg = "";
        return this.userStoryService.removeItem(story);
    }

    saveStory(story) {
        this.errorMsg = "";
        return this.userStoryService.saveItem(story);
    }

    emitChange() {
        var self = this;
        this.userStoryService.getItems().then(function (stories) {
            self.stories = stories;
            self.emit("change");
        });
    }

}

angular.module("myApp").service("userStoryStore", function (C, dispatcher, userStoryService) {
    var userStoryStore = new UserStoryStore(userStoryService, C);

    dispatcher.addListener(function (action) {
        switch (action.actionType) {
            case ADD_STORY:
                userStoryStore.addStory(action.item).then(function (response) {
                    userStoryStore.emitChange();
                });
                break;

            case REMOVE_STORY:
                userStoryStore.removeStory(action.item).then(function (response) {
                    userStoryStore.emitChange();
                });
                break;

            case SAVE_STORY:
                userStoryStore.saveStory(action.item).then(function (response) {
                    userStoryStore.emitChange();
                });
                break;

        }


    });

    //expose only the public interface
    this.addListener = function (l) {
        userStoryStore.addListener(l);
    };

    this.getStories = function () {
        return userStoryStore.getStories();
    };

    this.getErrorMsg = function () {
        return userStoryStore.getErrorMsg();
    };
});
