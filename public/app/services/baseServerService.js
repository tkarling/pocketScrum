"use strict";

class baseServerService {
    constructor($http, MY_SERVER) {
        this.MY_SERVER = MY_SERVER;
        this.$http = $http;
        this.criteriaChar = "&";
        this.currentItem = {name: "All"};
    }

    addItemsIfNeeded() {

    }

    setCurrentProjectId(project_id) {
        this.currentProjectId = project_id;
        this.url = this.MY_SERVER.url;
        this.baseUrl = this.MY_SERVER.url + this.typeUri;
        this.getUrl = this.baseUrl + (this.currentProjectId ? ("?project=" + this.currentProjectId) : "?");
        this.baseUrlWId = this.baseUrl + "?id=";

        //console.log("setCurrentProjectId", this);
        this.addItemsIfNeeded();
    }

    saveData(items) {

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

        return this.$http.get(this.getUrl).then((response) => {
            var items = response.data;
            this.saveData(items);
            items.currentItem = this.currentItem;
            //console.log("response.data.currentItem", response.data.currentItem);
            return items;
        });
    }

    getItem(fieldname, expectedValue) {
        var criteria = this.criteriaChar + fieldname + "=" + expectedValue;
        return this.$http.get(this.getUrl + criteria).then(function(response) {
            var items = response.data;
            if(items.length > 0) {
                return items[0];
            }
            return null;
        });

    }

    addItem(item) {
        item.project = this.currentProjectId;
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

class statusService extends baseServerService {
    constructor($http, MY_SERVER) {
        super($http, MY_SERVER);
        this.baseUrl = MY_SERVER.url +  MY_SERVER.statusUri;
        this.getUrl = this.baseUrl;
        this.baseUrlWId = this.baseUrl + "?id=";
        this.criteriaChar = "?";


        this.setupStatusesIfNeeded();
        //console.log("init statusService", this);
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

    not_started_status_id () {
        return this.NOT_STARTED_STATUS_ID;
    }

    saveData(items) {
        if(! this.NOT_STARTED_STATUS_ID) {
            for(var i = 0; i < items.length; i++) {
                if(items[i].name === "not started") {
                    this.NOT_STARTED_STATUS_ID = items[i]._id;
                    return;
                }
            }
        }
    }

}
angular.module("myApp").service("statusService", statusService);

class projectService extends baseServerService {
    constructor($http, MY_SERVER) {
        super($http, MY_SERVER);
        this.baseUrl = MY_SERVER.url + MY_SERVER.projectsUri;
        this.getUrl = this.baseUrl;
        this.baseUrlWId = this.baseUrl + "?id=";
        this.criteriaChar = "?";
        //console.log("init projectService", this);
    }

    addItem(item) {
        return this.$http.post(this.baseUrl, item).then((response) => {
            return response.data;
        });
    }

}
angular.module("myApp").service("projectService", projectService);


class featureService extends baseServerService {
    constructor($http, MY_SERVER) {
        super($http, MY_SERVER);
        this.typeUri = MY_SERVER.featuresUri;
        this.currentItem = {name: "All Features"};
        //console.log("init featureService", this);
    }

    addItemsIfNeeded() {
        this.getItems().then((items) => {
           if(items.length === 0) {
               this.addItem({name: "Feature1", project: this.currentProjectId });
               this.addItem({name: "Feature2", project: this.currentProjectId });

           }
        });
    }

}
angular.module("myApp").service("featureService", featureService);

class teamMemberService extends baseServerService {
    constructor($http, MY_SERVER) {
        super($http, MY_SERVER);
        this.typeUri = MY_SERVER.membersUri;
        //console.log("init teamMemberService", this);
    }

    addItemsIfNeeded() {
        this.getItems().then((items) => {
            if(items.length === 0) {
                this.addItem({name: "Test Member1",
                    authId: this.currentProjectId, authProvider: "facebook",
                    email: this.currentProjectId,
                    currentProject: this.currentProjectId});
                this.addItem({name: "Test Member2",
                    authId: this.currentProjectId+1, authProvider: "facebook",
                    email: this.currentProjectId+1,
                    currentProject: this.currentProjectId});
            }
        });
    }

}
angular.module("myApp").service("teamMemberService", teamMemberService);

class userStoryService extends baseServerService {
    constructor($http, MY_SERVER, statusService) {
        super($http, MY_SERVER);
        this.statusService = statusService;
        this.typeUri = MY_SERVER.storiesUri;
        //console.log("init userStoryService", this);
    }

    addItem(item) {
        item.status = this.statusService.not_started_status_id();
        return super.addItem(item);
    }

}
angular.module("myApp").service("userStoryService", userStoryService);
