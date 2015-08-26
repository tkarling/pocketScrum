"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var userStoryService = (function () {
    function userStoryService($http, MY_SERVER) {
        _classCallCheck(this, userStoryService);

        //console.log("init picsService");
        this.url = MY_SERVER.url;
        this.storiesBaseUrl = MY_SERVER.url + "/stories";
        this.storiesBaseUrlWId = this.storiesBaseUrl + "?id=";
        this.$http = $http;
    }

    _createClass(userStoryService, [{
        key: "getStories",
        value: function getStories() {
            return this.$http.get(this.storiesBaseUrl).then(function (response) {
                return response.data;
            });
        }
    }, {
        key: "addStory",
        value: function addStory(story) {
            //console.log("addStory", story);
            return this.$http.post(this.storiesBaseUrl, story);
        }
    }, {
        key: "removeStory",
        value: function removeStory(story) {
            //console.log("removeStory", story);
            return this.$http["delete"](this.storiesBaseUrlWId + story._id);
        }
    }, {
        key: "saveStory",
        value: function saveStory(story) {
            //console.log("saveStory", story);
            return this.$http.put(this.storiesBaseUrlWId + story._id, story);
        }
    }]);

    return userStoryService;
})();

angular.module("myApp").service("userStoryService", userStoryService);

//# sourceMappingURL=userStoryService-compiled.js.map