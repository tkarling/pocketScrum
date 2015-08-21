"use strict";

class picsService {
    constructor($http, MY_SERVER) {
        console.log("init picsService");
        this.url = MY_SERVER.url + "/thumbnail";
        this.$http = $http;
    }

    getThumbnails() {
        return this.$http.get(this.url).then(function(response) {
            return response.data;
        });
    }

    getPic() {
    }

    addPic(pic) {
        console.log("adding pic");
    }

    removePic(pic) {
    }
}

angular.module("myApp").service("picsService", picsService);