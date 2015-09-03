"use strict";

//defaults service

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var C = (function () {
    function C($http, $log, MY_SERVER, statusService, teamMemberService, userStoryService, featureService, projectService, picsService) {
        _classCallCheck(this, C);

        this.$http = $http;
        this.$log = $log;
        this.MY_SERVER = MY_SERVER;
        this.url = MY_SERVER.url;

        this.statusService = statusService;
        this.teamMemberService = teamMemberService;
        this.featureService = featureService;
        this.userStoryService = userStoryService;
        this.projectService = projectService;
        this.picsService = picsService;

        this.getDefaultValues();

        // FOR TESTING
        //this.readAll();
        //this.setProjectForMembers();
        //this.setProjectForFeatures();
        //this.setProjectForUserStories();
        //this.setProjectForPictures();
    }

    _createClass(C, [{
        key: "getDefaultValues",
        value: function getDefaultValues() {
            var _this = this;

            this.featureService.getItem("name", "All Features").then(function (item) {
                _this.ALL_FEATURES_ID = item._id;
            });
            this.teamMemberService.getItem("name", "All Members").then(function (item) {
                _this.ALL_MEMBERS_ID = item._id;
            });
            this.teamMemberService.getItem("name", "Not Assigned").then(function (item) {
                _this.NOT_SET_MEMBER_ID = item._id;
            });
            this.picsService.getPicData("keywords[0]", "default member pic").then(function (item) {
                console.log("item", item);
                if (item) {
                    _this.DEFAULT_MEMBER_PIC_ID = item.picId;
                    console.log("this.DEFAULT_MEMBER_PIC_ID", _this.DEFAULT_MEMBER_PIC_ID);
                } else {
                    _this.$log.error("no MEMBER PIC");
                }
            });
            this.projectService.getItems().then(function (items) {
                if (items.length > 0) {
                    _this.DEFAULT_PROJECT_ID = items[0]._id;
                    console.log("this.DEFAULT_PROJECT_ID", _this.DEFAULT_PROJECT_ID);
                } else {
                    _this.$log.error("no default project");
                }
            });
        }
    }, {
        key: "setupOneProject",
        value: function setupOneProject() {}
    }, {
        key: "setupDefaults",
        value: function setupDefaults() {
            this["default"] = {
                project: "",
                memberPicId: ""
            };
        }
    }, {
        key: "setupProject",
        value: function setupProject() {
            var _this2 = this;

            this.projectService.getItems().then(function (items) {
                if (items.length === 0) {
                    _this2.projectService.addItem({ name: "myProject" });
                }
            });
        }
    }, {
        key: "setupFeatures",
        value: function setupFeatures() {
            var _this3 = this;

            this.featureService.getItems().then(function (items) {
                if (items.length === 0) {
                    _this3.featureService.addItem({ name: "All Features", noShow: true });
                    _this3.featureService.addItem({ name: "Feature1", project: _this3["default"].project });
                    _this3.featureService.addItem({ name: "Feature2", project: _this3["default"].project });
                }
            });
        }
    }, {
        key: "setupMembers",
        value: function setupMembers() {
            var _this4 = this;

            this.teamMemberService.getItems().then(function (items) {
                if (items.length === 0) {
                    _this4.teamMemberService.addItem({ name: "All Members", noShow: true });
                    _this4.teamMemberService.addItem({ name: "Not Assigned", project: _this4["default"].project });
                    _this4.teamMemberService.addItem({ name: "Test Member", project: _this4["default"].project });
                }
            });
        }
    }, {
        key: "setupStatuses",
        value: function setupStatuses() {
            var _this5 = this;

            this.statusService.getItems().then(function (items) {
                if (items.length === 0) {
                    _this5.statusService.addItem({ name: "not started" });
                    _this5.statusService.addItem({ name: "in progress" });
                    _this5.statusService.addItem({ name: "impeded" });
                    _this5.statusService.addItem({ name: "done" });
                    _this5.statusService.addItem({ name: "rejected" });
                }
            });
        }
    }, {
        key: "readAll",
        value: function readAll() {
            var _this6 = this;

            this.teamMemberService.getItems().then(function (items) {
                console.log("teamMemberService", items);
                _this6.featureService.getItems().then(function (items) {
                    console.log("featureService", items);
                    _this6.userStoryService.getItems().then(function (items) {
                        console.log("userStoryService", items);
                        _this6.picsService.getPicDatas().then(function (items) {
                            console.log("picsService", items);
                            _this6.statusService.getItems().then(function (items) {
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
            var _this7 = this;

            this.teamMemberService.getItems().then(function (items) {
                console.log("teamMemberService items", items);
                for (var i = 0; i < items.length; i++) {
                    //console.log(items[i]);
                    items[i].currentProject = "55e61a9eb63286404af60c61";
                    _this7.teamMemberService.saveItem(items[i]);
                }
            });
        }
    }, {
        key: "setProjectForFeatures",
        value: function setProjectForFeatures() {
            var _this8 = this;

            this.featureService.getItems().then(function (items) {
                console.log("featureService items", items);
                for (var i = 0; i < items.length; i++) {
                    //console.log(items[i]);
                    items[i].project = "55e61a9eb63286404af60c61";
                    _this8.featureService.saveItem(items[i]);
                }
            });
        }
    }, {
        key: "setProjectForUserStories",
        value: function setProjectForUserStories() {
            var _this9 = this;

            this.userStoryService.getItems().then(function (items) {
                console.log("userStoryService items", items);
                for (var i = 0; i < items.length; i++) {
                    //console.log(items[i]);
                    items[i].project = "55e61a9eb63286404af60c61";
                    _this9.userStoryService.saveItem(items[i]);
                }
            });
        }
    }, {
        key: "setProjectForPictures",
        value: function setProjectForPictures() {
            var _this10 = this;

            this.picsService.getPicDatas().then(function (items) {
                console.log("picsService items", items);
                for (var i = 0; i < items.length; i++) {
                    //console.log(items[i]);
                    items[i].project = "55e61a9eb63286404af60c61";
                    _this10.picsService.savePic(items[i]);
                }
            });
        }
    }]);

    return C;
})();

angular.module("myApp").service("C", C);

//# sourceMappingURL=defaultsService-compiled.js.map