"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultsService = (function () {
    function defaultsService($http, MY_SERVER, statusService, teamMemberService, userStoryService, featureService, picsService) {
        _classCallCheck(this, defaultsService);

        this.$http = $http;
        this.MY_SERVER = MY_SERVER;
        this.url = MY_SERVER.url;

        this.statusService = statusService;
        this.teamMemberService = teamMemberService;
        this.featureService = featureService;
        this.userStoryService = userStoryService;
        this.picsService = picsService;

        //this.readAll();
        //this.setProjectForMembers();
        //this.setProjectForFeatures();
        //this.setProjectForUserStories();
        //this.setProjectForPictures();
    }

    _createClass(defaultsService, [{
        key: "readAll",
        value: function readAll() {
            var _this = this;

            this.teamMemberService.getItems().then(function (items) {
                console.log("teamMemberService", items);
                _this.featureService.getItems().then(function (items) {
                    console.log("featureService", items);
                    _this.userStoryService.getItems().then(function (items) {
                        console.log("userStoryService", items);
                        _this.picsService.getPicDatas().then(function (items) {
                            console.log("picsService", items);
                            _this.statusService.getItems().then(function (items) {
                                console.log("statusService", items);
                            });
                        });
                    });
                });
            });
        }
    }, {
        key: "setProjectForMembers",
        value: function setProjectForMembers() {
            var _this2 = this;

            this.teamMemberService.getItems().then(function (items) {
                console.log("teamMemberService items", items);
                for (var i = 0; i < items.length; i++) {
                    //console.log(items[i]);
                    items[i].currentProject = "55e61a9eb63286404af60c61";
                    _this2.teamMemberService.saveItem(items[i]);
                }
            });
        }
    }, {
        key: "setProjectForFeatures",
        value: function setProjectForFeatures() {
            var _this3 = this;

            this.featureService.getItems().then(function (items) {
                console.log("featureService items", items);
                for (var i = 0; i < items.length; i++) {
                    //console.log(items[i]);
                    items[i].project = "55e61a9eb63286404af60c61";
                    _this3.featureService.saveItem(items[i]);
                }
            });
        }
    }, {
        key: "setProjectForUserStories",
        value: function setProjectForUserStories() {
            var _this4 = this;

            this.userStoryService.getItems().then(function (items) {
                console.log("userStoryService items", items);
                for (var i = 0; i < items.length; i++) {
                    //console.log(items[i]);
                    items[i].project = "55e61a9eb63286404af60c61";
                    _this4.userStoryService.saveItem(items[i]);
                }
            });
        }
    }, {
        key: "setProjectForPictures",
        value: function setProjectForPictures() {
            var _this5 = this;

            this.picsService.getPicDatas().then(function (items) {
                console.log("picsService items", items);
                for (var i = 0; i < items.length; i++) {
                    //console.log(items[i]);
                    items[i].project = "55e61a9eb63286404af60c61";
                    _this5.picsService.savePic(items[i]);
                }
            });
        }
    }]);

    return defaultsService;
})();

angular.module("myApp").service("defaultsService", defaultsService);

//# sourceMappingURL=defaultsService-compiled.js.map