"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var picsService = (function () {
    function picsService($http) {
        _classCallCheck(this, picsService);

        console.log("init picsService");
        this.url = "http://localhost:3039/api/pocketScrum/thumbnail";
        this.$http = $http;
    }

    _createClass(picsService, [{
        key: "getThumbnails",
        value: function getThumbnails() {
            return this.$http.get(this.url).then(function (response) {
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
        value: function removePic(pic) {}
    }]);

    return picsService;
})();

angular.module("myApp").service("picsService", picsService);

//# sourceMappingURL=picsService-compiled.js.map