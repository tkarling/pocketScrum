"use strict";

class picsService {
    constructor($http, MY_SERVER) {
        //console.log("init picsService");
        this.url = MY_SERVER.url;
        this.picsBaseUrl = MY_SERVER.url + "/designpic";
        this.picsBaseUrlWId = MY_SERVER.url + "/designpic?id=";
        this.$http = $http;
    }

    getPicDatas() {
        return this.$http.get(this.picsBaseUrl).then(function(response) {
            return response.data;
        });
    }

    getPic() {
    }

    addPic(pic) {
        console.log("adding pic");
    }

    removePic(pic) {
        return this.$http.delete(this.picsBaseUrlWId + pic._id);
    }
}

angular.module("myApp").service("picsService", picsService);