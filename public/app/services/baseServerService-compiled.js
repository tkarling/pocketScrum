"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var baseServerService = (function () {
    function baseServerService($http, MY_SERVER) {
        _classCallCheck(this, baseServerService);

        this.MY_SERVER = MY_SERVER;
        this.$http = $http;
        this.criteriaChar = "&";
        this.currentItem = { name: "All" };
    }

    _createClass(baseServerService, [{
        key: "addItemsIfNeeded",
        value: function addItemsIfNeeded() {}
    }, {
        key: "setCurrentProjectId",
        value: function setCurrentProjectId(project_id) {
            this.currentProjectId = project_id;
            this.url = this.MY_SERVER.url;
            this.baseUrl = this.MY_SERVER.url + this.typeUri;
            this.getUrl = this.baseUrl + (this.currentProjectId ? "?project=" + this.currentProjectId : "?");
            this.baseUrlWId = this.baseUrl + "?id=";

            console.log("setCurrentProjectId", this);
            this.addItemsIfNeeded();
        }
    }, {
        key: "saveData",
        value: function saveData(items) {}
    }, {
        key: "getItems",
        value: function getItems() {
            var _this = this;

            var getAllItemsItem = function getAllItemsItem(items) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].name.indexOf("All ") !== -1) {
                        return items[i];
                    }
                }
                return undefined;
            };

            return this.$http.get(this.getUrl).then(function (response) {
                var items = response.data;
                _this.saveData(items);
                items.currentItem = _this.currentItem;
                //console.log("response.data.currentItem", response.data.currentItem);
                return items;
            });
        }
    }, {
        key: "getItem",
        value: function getItem(fieldname, expectedValue) {
            var criteria = this.criteriaChar + fieldname + "=" + expectedValue;
            return this.$http.get(this.getUrl + criteria).then(function (response) {
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
            item.project = this.currentProjectId;
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

var statusService = (function (_baseServerService) {
    _inherits(statusService, _baseServerService);

    function statusService($http, MY_SERVER) {
        _classCallCheck(this, statusService);

        _get(Object.getPrototypeOf(statusService.prototype), "constructor", this).call(this, $http, MY_SERVER);
        this.baseUrl = MY_SERVER.url + MY_SERVER.statusUri;
        this.getUrl = this.baseUrl;
        this.baseUrlWId = this.baseUrl + "?id=";
        this.criteriaChar = "?";

        this.setupStatusesIfNeeded();
        console.log("init statusService", this);
    }

    _createClass(statusService, [{
        key: "setupStatusesIfNeeded",
        value: function setupStatusesIfNeeded() {
            var _this2 = this;

            this.getItems().then(function (items) {
                if (items.length === 0) {
                    _this2.addItem({ name: "not started" });
                    _this2.addItem({ name: "in progress" });
                    _this2.addItem({ name: "impeded" });
                    _this2.addItem({ name: "done" });
                    _this2.addItem({ name: "rejected" });
                }
            });
        }
    }, {
        key: "not_started_status_id",
        value: function not_started_status_id() {
            return this.NOT_STARTED_STATUS_ID;
        }
    }, {
        key: "saveData",
        value: function saveData(items) {
            if (!this.NOT_STARTED_STATUS_ID) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].name === "not started") {
                        this.NOT_STARTED_STATUS_ID = items[i]._id;
                        return;
                    }
                }
            }
        }
    }]);

    return statusService;
})(baseServerService);

angular.module("myApp").service("statusService", statusService);

var projectService = (function (_baseServerService2) {
    _inherits(projectService, _baseServerService2);

    function projectService($http, MY_SERVER) {
        _classCallCheck(this, projectService);

        _get(Object.getPrototypeOf(projectService.prototype), "constructor", this).call(this, $http, MY_SERVER);
        this.baseUrl = MY_SERVER.url + MY_SERVER.projectsUri;
        this.getUrl = this.baseUrl;
        this.baseUrlWId = this.baseUrl + "?id=";
        this.criteriaChar = "?";
        console.log("init projectService", this);
    }

    _createClass(projectService, [{
        key: "addItem",
        value: function addItem(item) {
            return this.$http.post(this.baseUrl, item).then(function (response) {
                return response.data;
            });
        }
    }]);

    return projectService;
})(baseServerService);

angular.module("myApp").service("projectService", projectService);

var featureService = (function (_baseServerService3) {
    _inherits(featureService, _baseServerService3);

    function featureService($http, MY_SERVER) {
        _classCallCheck(this, featureService);

        _get(Object.getPrototypeOf(featureService.prototype), "constructor", this).call(this, $http, MY_SERVER);
        this.typeUri = MY_SERVER.featuresUri;
        this.currentItem = { name: "All Features" };
        console.log("init featureService", this);
    }

    _createClass(featureService, [{
        key: "addItemsIfNeeded",
        value: function addItemsIfNeeded() {
            var _this3 = this;

            this.getItems().then(function (items) {
                if (items.length === 0) {
                    _this3.addItem({ name: "Feature1", project: _this3.currentProjectId });
                    _this3.addItem({ name: "Feature2", project: _this3.currentProjectId });
                }
            });
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
        this.typeUri = MY_SERVER.membersUri;
        console.log("init teamMemberService", this);
    }

    _createClass(teamMemberService, [{
        key: "addItemsIfNeeded",
        value: function addItemsIfNeeded() {
            var _this4 = this;

            this.getItems().then(function (items) {
                if (items.length === 0) {
                    _this4.addItem({ name: "Test Member1",
                        authId: _this4.currentProjectId, authProvider: "facebook",
                        email: _this4.currentProjectId,
                        currentProject: _this4.currentProjectId });
                    _this4.addItem({ name: "Test Member2",
                        authId: _this4.currentProjectId + 1, authProvider: "facebook",
                        email: _this4.currentProjectId + 1,
                        currentProject: _this4.currentProjectId });
                }
            });
        }
    }]);

    return teamMemberService;
})(baseServerService);

angular.module("myApp").service("teamMemberService", teamMemberService);

var userStoryService = (function (_baseServerService5) {
    _inherits(userStoryService, _baseServerService5);

    function userStoryService($http, MY_SERVER, statusService) {
        _classCallCheck(this, userStoryService);

        _get(Object.getPrototypeOf(userStoryService.prototype), "constructor", this).call(this, $http, MY_SERVER);
        this.statusService = statusService;
        this.typeUri = MY_SERVER.storiesUri;
        console.log("init userStoryService", this);
    }

    _createClass(userStoryService, [{
        key: "addItem",
        value: function addItem(item) {
            item.status = this.statusService.not_started_status_id();
            return _get(Object.getPrototypeOf(userStoryService.prototype), "addItem", this).call(this, item);
        }
    }]);

    return userStoryService;
})(baseServerService);

angular.module("myApp").service("userStoryService", userStoryService);

//# sourceMappingURL=baseServerService-compiled.js.map