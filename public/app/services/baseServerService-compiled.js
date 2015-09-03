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
            var getAllItemsItem = function getAllItemsItem(items) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].name.indexOf("All ") !== -1) {
                        return items[i];
                    }
                }
                return undefined;
            };

            return this.$http.get(this.baseUrl).then(function (response) {
                var items = response.data;
                items.currentItem = getAllItemsItem(items);
                //console.log("response.data.currentItem", response.data.currentItem);
                return items;
            });
        }
    }, {
        key: "getItem",
        value: function getItem(fieldname, expectedValue) {
            var criteria = "?" + fieldname + "=" + expectedValue;
            return this.$http.get(this.baseUrl + criteria).then(function (response) {
                var items = response.data;
                if (items.length > 0) {
                    return items[0];
                }
                return null;
            });
        }
    }, {
        key: "addItem",
        value: function addItem(item) {
            return this.$http.post(this.baseUrl, item).then(function (response) {
                return response.data;
            });
        }
    }, {
        key: "removeItem",
        value: function removeItem(item) {
            return this.$http["delete"](this.baseUrlWId + item._id).then(function (response) {
                return response.data;
            });
        }
    }, {
        key: "saveItem",
        value: function saveItem(item) {
            return this.$http.put(this.baseUrlWId + item._id, item).then(function (response) {
                return response.data;
            });
        }
    }]);

    return baseServerService;
})();

var userStoryService = (function (_baseServerService) {
    _inherits(userStoryService, _baseServerService);

    function userStoryService($http, MY_SERVER) {
        _classCallCheck(this, userStoryService);

        _get(Object.getPrototypeOf(userStoryService.prototype), "constructor", this).call(this, $http, MY_SERVER);
        this.baseUrl = MY_SERVER.url + MY_SERVER.storiesUri;
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
        this.baseUrl = MY_SERVER.url + MY_SERVER.statusUri;
        this.baseUrlWId = this.baseUrl + "?id=";

        this.setupStatusesIfNeeded();
    }

    _createClass(statusService, [{
        key: "setupStatusesIfNeeded",
        value: function setupStatusesIfNeeded() {
            var _this = this;

            this.getItems().then(function (items) {
                if (items.length === 0) {
                    _this.addItem({ name: "not started" });
                    _this.addItem({ name: "in progress" });
                    _this.addItem({ name: "impeded" });
                    _this.addItem({ name: "done" });
                    _this.addItem({ name: "rejected" });
                }
            });
        }
    }]);

    return statusService;
})(baseServerService);

angular.module("myApp").service("statusService", statusService);

var featureService = (function (_baseServerService3) {
    _inherits(featureService, _baseServerService3);

    function featureService($http, MY_SERVER) {
        _classCallCheck(this, featureService);

        _get(Object.getPrototypeOf(featureService.prototype), "constructor", this).call(this, $http, MY_SERVER);
        this.baseUrl = MY_SERVER.url + MY_SERVER.featuresUri;
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

var teamMemberService = (function (_baseServerService4) {
    _inherits(teamMemberService, _baseServerService4);

    function teamMemberService($http, MY_SERVER) {
        _classCallCheck(this, teamMemberService);

        _get(Object.getPrototypeOf(teamMemberService.prototype), "constructor", this).call(this, $http, MY_SERVER);
        this.baseUrl = MY_SERVER.url + MY_SERVER.membersUri;
        this.baseUrlWId = this.baseUrl + "?id=";
    }

    return teamMemberService;
})(baseServerService);

angular.module("myApp").service("teamMemberService", teamMemberService);

var projectService = (function (_baseServerService5) {
    _inherits(projectService, _baseServerService5);

    function projectService($http, MY_SERVER) {
        _classCallCheck(this, projectService);

        _get(Object.getPrototypeOf(projectService.prototype), "constructor", this).call(this, $http, MY_SERVER);
        this.baseUrl = MY_SERVER.url + MY_SERVER.projectsUri;
        this.baseUrlWId = this.baseUrl + "?id=";
    }

    return projectService;
})(baseServerService);

angular.module("myApp").service("projectService", projectService);

//# sourceMappingURL=baseServerService-compiled.js.map