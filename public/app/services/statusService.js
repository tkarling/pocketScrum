"use strict";

class statusService {
    constructor($http, $q, MY_SERVER) {
        this.url = MY_SERVER.url;
        this.statusBaseUrl = MY_SERVER.url + "/status";
        this.statusBaseUrlWId = this.statusBaseUrl + "?id=";
        this.$http = $http;
        this.$q = $q;
    }

    getStatuses() {
        if(this.statuses) {
            this.$q.when(this.statuses);
        }
        var self = this;
        return this.$http.get(this.statusBaseUrl).then(function(response) {
            self.statuses = response.data;
            return self.statuses;
        });
    }

    addStatus(status) {
        return this.$http.post(this.statusBaseUrl, status);
    }

    removeStatus(status) {
        return this.$http.delete(this.statusBaseUrlWId + status._id);
    }

    saveStatus(status) {
        return this.$http.put(this.statusBaseUrlWId + status._id, status);
    }
}

angular.module("myApp").service("statusService", statusService);