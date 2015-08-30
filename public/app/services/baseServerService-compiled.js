"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var baseServerService = (function () {
    function baseServerService($http, MY_SERVER) {
        _classCallCheck(this, baseServerService);

        this.url = MY_SERVER.url;
        this.$http = $http;
    }

    _createClass(baseServerService, [{
        key: "getItems",
        value: function getItems() {
            return this.$http.get(this.baseUrl).then(function (response) {
                return response.data;
            });
        }
    }, {
        key: "addItem",
        value: function addItem(story) {
            return this.$http.post(this.baseUrl, story);
        }
    }, {
        key: "removeItem",
        value: function removeItem(story) {
            return this.$http["delete"](this.baseUrlWId + story._id);
        }
    }, {
        key: "saveItem",
        value: function saveItem(story) {
            return this.$http.put(this.baseUrlWId + story._id, story);
        }
    }]);

    return baseServerService;
})();

var userStoryService = (function (_baseServerService) {
    _inherits(userStoryService, _baseServerService);

    function userStoryService($http, MY_SERVER) {
        _classCallCheck(this, userStoryService);

        _get(Object.getPrototypeOf(userStoryService.prototype), "constructor", this).call(this, $http, MY_SERVER);
        this.baseUrl = MY_SERVER.url + "/stories";
        this.baseUrlWId = this.baseUrl + "?id=";
    }

    return userStoryService;
})(baseServerService);

angular.module("myApp").service("userStoryService", userStoryService);

var statusService = (function (_baseServerService2) {
    _inherits(statusService, _baseServerService2);

    function statusService($http, MY_SERVER) {
        _classCallCheck(this, statusService);

        _get(Object.getPrototypeOf(statusService.prototype), "constructor", this).call(this, $http, MY_SERVER);
        this.baseUrl = MY_SERVER.url + "/status";
        this.baseUrlWId = this.baseUrl + "?id=";
    }

    return statusService;
})(baseServerService);

angular.module("myApp").service("statusService", statusService);

var featureService = (function (_baseServerService3) {
    _inherits(featureService, _baseServerService3);

    function featureService($http, MY_SERVER) {
        _classCallCheck(this, featureService);

        _get(Object.getPrototypeOf(featureService.prototype), "constructor", this).call(this, $http, MY_SERVER);
        this.baseUrl = MY_SERVER.url + "/features";
        this.baseUrlWId = this.baseUrl + "?id=";
    }

    _createClass(featureService, [{
        key: "currentFeature",
        get: function get() {
            return this.currentFeature;
        },
        set: function set(value) {
            this.currentFeature = value;
        }
    }]);

    return featureService;
})(baseServerService);

angular.module("myApp").service("featureService", featureService);

//# sourceMappingURL=baseServerService-compiled.js.map