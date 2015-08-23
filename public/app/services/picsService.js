"use strict";

class picsService {
    constructor($http, Upload, MY_SERVER) {
        //console.log("init picsService");
        this.url = MY_SERVER.url;
        this.picsBaseUrl = MY_SERVER.url + "/designpic";
        this.picsBaseUrlWId = MY_SERVER.url + "/designpic?id=";
        this.$http = $http;
        this.Upload = Upload;
    }

    getPicDatas() {
        return this.$http.get(this.picsBaseUrl).then(function(response) {
            return response.data;
        });
    }

    addPic(pic) {
        return this.Upload.upload({
            url: this.picsBaseUrl,
            file: pic
        });
    }

    removePic(pic) {
        return this.$http.delete(this.picsBaseUrlWId + pic._id);
    }
}

angular.module("myApp").service("picsService", picsService);