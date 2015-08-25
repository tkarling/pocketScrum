"use strict";

var ADD_STORY = "ADD_STORY";
var REMOVE_STORY = "REMOVE_STORY";
var SELECT_PIC = "SELECT_PIC";
var SAVE_PIC = "SAVE_PIC";

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
            actionType: SAVE_PIC,
            item: item
        });
    }
}
angular.module("myApp").service("userStoryActions", userStoryActions);


class UserStoryStore extends EventEmitter {
    constructor(userStoryService) {
        super();
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
        this.errorMsg = "";
        return this.userStoryService.addStory(story)
            .then(function (response) {
            }, function (error) {
                if (error.status > 0) {
                    console.log("addStory error", error);
                    self.errorMsg = error.status + ': ' + error.statusText;
                }
            });
    }

    removeStory(story) {
        this.errorMsg = "";
        return this.userStoryService.removeStory(story);
    }

    saveStory(story) {
        this.errorMsg = "";
        return this.userStoryService.saveStory(story);
    }

    emitChange() {
        var self = this;
        this.userStoryService.getStories().then(function (stories) {
            self.stories = stories;
            self.emit("change");
        });
    }

}

angular.module("myApp").service("userStoryStore", function (dispatcher, userStoryService) {
    var userStoryStore = new UserStoryStore(userStoryService);

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

            case SAVE_PIC:
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
