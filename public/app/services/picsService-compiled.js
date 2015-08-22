"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var picsService = (function () {
    function picsService($http, MY_SERVER) {
        _classCallCheck(this, picsService);

        //console.log("init picsService");
        this.url = MY_SERVER.url;
        this.picsBaseUrl = MY_SERVER.url + "/designpic";
        this.picsBaseUrlWId = MY_SERVER.url + "/designpic?id=";
        this.$http = $http;
    }

    _createClass(picsService, [{
        key: "getPicDatas",
        value: function getPicDatas() {
            return this.$http.get(this.picsBaseUrl).then(function (response) {
                return response.data;
            });
        }
    }, {
        key: "getPic",
        value: function getPic() {}
    }, {
        key: "addPic",
        value: function addPic(pic) {
            console.log("adding pic");
        }
    }, {
        key: "removePic",
        value: function removePic(pic) {
            return this.$http["delete"](this.picsBaseUrlWId + pic._id);
        }
    }]);

    return picsService;
})();

angular.module("myApp").service("picsService", picsService);

//# sourceMappingURL=picsService-compiled.js.map