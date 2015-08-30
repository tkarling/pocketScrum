"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ADD_STORY = "ADD_STORY";
var REMOVE_STORY = "REMOVE_STORY";
var SAVE_STORY = "SAVE_STORY";

var userStoryActions = (function () {
    function userStoryActions(dispatcher) {
        _classCallCheck(this, userStoryActions);

        this.dispatcher = dispatcher;
    }

    _createClass(userStoryActions, [{
        key: "addStory",
        value: function addStory(item) {
            this.dispatcher.emit({
                actionType: ADD_STORY,
                item: item
            });
        }
    }, {
        key: "removeStory",
        value: function removeStory(item) {
            this.dispatcher.emit({
                actionType: REMOVE_STORY,
                item: item
            });
        }
    }, {
        key: "saveStory",
        value: function saveStory(item) {
            this.dispatcher.emit({
                actionType: SAVE_STORY,
                item: item
            });
        }
    }]);

    return userStoryActions;
})();

angular.module("myApp").service("userStoryActions", userStoryActions);

var UserStoryStore = (function (_EventEmitter) {
    _inherits(UserStoryStore, _EventEmitter);

    function UserStoryStore(userStoryService) {
        _classCallCheck(this, UserStoryStore);

        _get(Object.getPrototypeOf(UserStoryStore.prototype), "constructor", this).call(this);
        this.userStoryService = userStoryService;

        this.stories = [];
        this.errorMsg = "";

        this.emitChange();
    }

    _createClass(UserStoryStore, [{
        key: "getStories",
        value: function getStories() {
            return this.stories;
        }
    }, {
        key: "getErrorMsg",
        value: function getErrorMsg() {
            return this.errorMsg;
        }
    }, {
        key: "addStory",
        value: function addStory(story) {
            var self = this;
            this.errorMsg = "";
            return this.userStoryService.addItem(story).then(function (response) {}, function (error) {
                if (error.status > 0) {
                    console.log("addItem error", error);
                    self.errorMsg = error.status + ': ' + error.statusText;
                }
            });
        }
    }, {
        key: "removeStory",
        value: function removeStory(story) {
            this.errorMsg = "";
            return this.userStoryService.removeItem(story);
        }
    }, {
        key: "saveStory",
        value: function saveStory(story) {
            this.errorMsg = "";
            return this.userStoryService.saveItem(story);
        }
    }, {
        key: "emitChange",
        value: function emitChange() {
            var self = this;
            this.userStoryService.getItems().then(function (stories) {
                self.stories = stories;
                self.emit("change");
            });
        }
    }]);

    return UserStoryStore;
})(EventEmitter);

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

//# sourceMappingURL=userStoryStore-compiled.js.map