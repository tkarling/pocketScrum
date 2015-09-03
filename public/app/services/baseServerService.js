"use strict";

class baseServerService {
    constructor($http, MY_SERVER) {
        this.url = MY_SERVER.url;
        this.$http = $http;
    }

    getItems() {
        var getAllItemsItem = function(items) {
            for(var i= 0; i < items.length; i++) {
                if(items[i].name.indexOf("All ") !== -1) {
                    return items[i];
                }
            }
            return undefined;
        }

        return this.$http.get(this.baseUrl).then(function(response) {
            var items = response.data;
            items.currentItem = getAllItemsItem(items);
            //console.log("response.data.currentItem", response.data.currentItem);
            return items;
        });
    }

    getItem(fieldname, expectedValue) {
        var criteria = "?" + fieldname + "=" + expectedValue;
        return this.$http.get(this.baseUrl + criteria).then(function(response) {
            var items = response.data;
            if(items.length > 0) {
                return items[0];
            }
            return null;
        });

    }

    addItem(item) {
        return this.$http.post(this.baseUrl, item).then((response) => {
            return response.data;
        });
    }

    removeItem(item) {
        return this.$http.delete(this.baseUrlWId + item._id).then((response) => {
            return response.data;
        });
    }

    saveItem(item) {
        return this.$http.put(this.baseUrlWId + item._id, item).then((response) => {
            return response.data;
        });
    }
}

class userStoryService extends baseServerService {
    constructor($http, MY_SERVER) {
        super($http, MY_SERVER);
        this.baseUrl = MY_SERVER.url + MY_SERVER.storiesUri;
        this.baseUrlWId = this.baseUrl + "?id=";
    }

}
angular.module("myApp").service("userStoryService", userStoryService);


class statusService extends baseServerService {
    constructor($http, MY_SERVER) {
        super($http, MY_SERVER);
        this.baseUrl = MY_SERVER.url +  MY_SERVER.statusUri;
        this.baseUrlWId = this.baseUrl + "?id=";

        this.setupStatusesIfNeeded();
    }

    setupStatusesIfNeeded() {
        this.getItems().then((items) => {
            if(items.length === 0) {
                this.addItem({name: "not started"});
                this.addItem({name: "in progress"});
                this.addItem({name: "impeded"});
                this.addItem({name: "done"});
                this.addItem({name: "rejected"});
            }
        });
    }

}
angular.module("myApp").service("statusService", statusService);


class featureService extends baseServerService {
    constructor($http, MY_SERVER) {
        super($http, MY_SERVER);
        this.baseUrl = MY_SERVER.url + MY_SERVER.featuresUri;
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

class teamMemberService extends baseServerService {
    constructor($http, MY_SERVER) {
        super($http, MY_SERVER);
        this.baseUrl = MY_SERVER.url + MY_SERVER.membersUri;
        this.baseUrlWId = this.baseUrl + "?id=";
    }

}
angular.module("myApp").service("teamMemberService", teamMemberService);


class projectService extends baseServerService {
    constructor($http, MY_SERVER) {
        super($http, MY_SERVER);
        this.baseUrl = MY_SERVER.url + MY_SERVER.projectsUri;
        this.baseUrlWId = this.baseUrl + "?id=";
    }

}
angular.module("myApp").service("projectService", projectService);