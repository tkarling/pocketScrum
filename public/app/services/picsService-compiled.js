"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var picsService = (function () {
    function picsService($http, Upload, MY_SERVER) {
        _classCallCheck(this, picsService);

        //console.log("init picsService");
        this.url = MY_SERVER.url;
        this.baseUrl = MY_SERVER.url + MY_SERVER.picturesUri;
        this.baseUrlWId = this.baseUrl + MY_SERVER.idSelector;
        this.$http = $http;
        this.Upload = Upload;
    }

    _createClass(picsService, [{
        key: "getPicDatas",
        value: function getPicDatas() {
            return this.$http.get(this.baseUrl).then(function (response) {
                return response.data;
            });
        }
    }, {
        key: "addPic",
        value: function addPic(pic) {
            return this.Upload.upload({
                url: this.baseUrl,
                file: pic
            });
        }
    }, {
        key: "removePic",
        value: function removePic(pic) {
            return this.$http["delete"](this.baseUrlWId + pic._id);
        }
    }, {
        key: "savePic",
        value: function savePic(pic) {
            //console.log("savePic", pic);
            return this.$http.put(this.baseUrlWId + pic._id, pic);
        }
    }]);

    return picsService;
})();

angular.module("myApp").service("picsService", picsService);

//# sourceMappingURL=picsService-compiled.js.map