"use strict";

class picsService {
    constructor($http, Upload, MY_SERVER) {
        //console.log("init picsService");
        this.url = MY_SERVER.url;
        this.baseUrl = MY_SERVER.url + MY_SERVER.picturesUri;
        this.baseUrlWId = this.baseUrl + MY_SERVER.idSelector;
        this.$http = $http;
        this.Upload = Upload;
    }

    getPicDatas() {
        return this.$http.get(this.baseUrl).then(function(response) {
            return response.data;
        });
    }

    getPicData(fieldname, expectedValue) {
        var criteria = "?" + fieldname + "=" + expectedValue;
        return this.$http.get(this.baseUrl + criteria).then(function(response) {
            var items = response.data;
            if(items.length > 0) {
                return items[0];
            }
            return null;
        });
    }

    addPic(pic) {
        return this.Upload.upload({
            url: this.baseUrl,
            file: pic
        });
    }

    removePic(pic) {
        return this.$http.delete(this.baseUrlWId + pic._id);
    }

    savePic(pic) {
        //console.log("savePic", pic);
        return this.$http.put(this.baseUrlWId + pic._id, pic);
    }
}

angular.module("myApp").service("picsService", picsService);