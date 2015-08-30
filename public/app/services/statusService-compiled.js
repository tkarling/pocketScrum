"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var statusService = (function () {
    function statusService($http, $q, MY_SERVER) {
        _classCallCheck(this, statusService);

        this.url = MY_SERVER.url;
        this.statusBaseUrl = MY_SERVER.url + "/status";
        this.statusBaseUrlWId = this.statusBaseUrl + "?id=";
        this.$http = $http;
        this.$q = $q;
    }

    _createClass(statusService, [{
        key: "getStatuses",
        value: function getStatuses() {
            if (this.statuses) {
                this.$q.when(this.statuses);
            }
            var self = this;
            return this.$http.get(this.statusBaseUrl).then(function (response) {
                self.statuses = response.data;
                return self.statuses;
            });
        }
    }, {
        key: "addStatus",
        value: function addStatus(status) {
            return this.$http.post(this.statusBaseUrl, status);
        }
    }, {
        key: "removeStatus",
        value: function removeStatus(status) {
            return this.$http["delete"](this.statusBaseUrlWId + status._id);
        }
    }, {
        key: "saveStatus",
        value: function saveStatus(status) {
            return this.$http.put(this.statusBaseUrlWId + status._id, status);
        }
    }]);

    return statusService;
})();

angular.module("myApp").service("statusService", statusService);

//# sourceMappingURL=statusService-compiled.js.map