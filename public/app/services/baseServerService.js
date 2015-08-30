"use strict";

class baseServerService {
    constructor($http, MY_SERVER) {
        this.url = MY_SERVER.url;
        this.$http = $http;
    }

    getItems() {
        return this.$http.get(this.baseUrl).then(function(response) {
            return response.data;
        });
    }

    addItem(story) {
        return this.$http.post(this.baseUrl, story);
    }

    removeItem(story) {
        return this.$http.delete(this.baseUrlWId + story._id);
    }

    saveItem(story) {
        return this.$http.put(this.baseUrlWId + story._id, story);
    }
}

class userStoryService extends baseServerService {
    constructor($http, MY_SERVER) {
        super($http, MY_SERVER);
        this.baseUrl = MY_SERVER.url + "/stories";
        this.baseUrlWId = this.baseUrl + "?id=";
    }

}
angular.module("myApp").service("userStoryService", userStoryService);


class statusService extends baseServerService {
    constructor($http, MY_SERVER) {
        super($http, MY_SERVER);
        this.baseUrl = MY_SERVER.url + "/status";
        this.baseUrlWId = this.baseUrl + "?id=";
    }

}
angular.module("myApp").service("statusService", statusService);


class featureService extends baseServerService {
    constructor($http, MY_SERVER) {
        super($http, MY_SERVER);
        this.baseUrl = MY_SERVER.url + "/features";
        this.baseUrlWId = this.baseUrl + "?id=";
    }

    get currentFeature() {
        return this.currentFeature;
    }

    set currentFeature(value) {
        this.currentFeature = value;
    }
}
angular.module("myApp").service("featureService", featureService);