"use strict";

class userStoryService {
    constructor($http, MY_SERVER) {
        //console.log("init picsService");
        this.url = MY_SERVER.url;
        this.storiesBaseUrl = MY_SERVER.url + "/stories";
        this.storiesBaseUrlWId = this.storiesBaseUrl + "?id=";
        this.$http = $http;
    }

    getStories() {
        return this.$http.get(this.storiesBaseUrl).then(function(response) {
            return response.data;
        });
    }

    addStory(story) {
        //console.log("addStory", story);
        return this.$http.post(this.storiesBaseUrl, story);
    }

    removeStory(story) {
        //console.log("removeStory", story);
        return this.$http.delete(this.storiesBaseUrlWId + story._id);
    }

    saveStory(story) {
        //console.log("saveStory", story);
        return this.$http.put(this.storiesBaseUrlWId + story._id, story);
    }
}

angular.module("myApp").service("userStoryService", userStoryService);
