"use strict";

//defaults service

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var C = (function () {
    function C($http, $log, $q, statusService, teamMemberService, userStoryService, featureService, projectService, picsService) {
        _classCallCheck(this, C);

        this.$http = $http;
        this.$log = $log;
        this.$q = $q;

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
                //console.log("item", item);
                if (item) {
                    _this.DEFAULT_MEMBER_PIC_ID = item.picId;
                    //console.log("this.DEFAULT_MEMBER_PIC_ID", this.DEFAULT_MEMBER_PIC_ID);
                } else {
                        _this.$log.error("no MEMBER PIC");
                    }
            });
            this.projectService.getItems().then(function (items) {
                if (items.length > 0) {
                    _this.DEFAULT_PROJECT_ID = items[0]._id;
                    //console.log("this.DEFAULT_PROJECT_ID", this.DEFAULT_PROJECT_ID);
                } else {
                        _this.$log.error("no default project");
                    }
            });
        }
    }, {
        key: "setupDB",
        value: function setupDB() {
            var _this2 = this;

            this.setupStatuses();
            this.setupOneProject().then(function () {
                _this2.getDefaultValues();
            });
        }
    }, {
        key: "setupOneProject",
        value: function setupOneProject() {
            var _this3 = this;

            return this.setupProject().then(function (addedProject) {
                return _this3.$q.all([_this3.setupFeatures(addedProject._id), _this3.setupMembers(addedProject._id)]);
            });
        }
    }, {
        key: "setupProject",
        value: function setupProject() {
            var _this4 = this;

            return this.projectService.getItems().then(function (items) {
                if (items.length === 0) {
                    return _this4.projectService.addItem({ name: "myProject" }).then(function (addedItem) {
                        return addedItem;
                    });
                }
            });
        }
    }, {
        key: "setupFeatures",
        value: function setupFeatures(project) {
            var _this5 = this;

            this.featureService.getItems().then(function (items) {
                if (items.length === 0) {
                    _this5.featureService.addItem({ name: "All Features", noShow: true });
                }
                _this5.featureService.addItem({ name: "Feature1", project: project });
                _this5.featureService.addItem({ name: "Feature2", project: project });
            });
        }
    }, {
        key: "setupMembers",
        value: function setupMembers(project) {
            var _this6 = this;

            this.teamMemberService.getItems().then(function (items) {
                if (items.length === 0) {
                    _this6.teamMemberService.addItem({ name: "All Members", noShow: true });
                    _this6.teamMemberService.addItem({ name: "Not Assigned" });
                }
                _this6.teamMemberService.addItem({ name: "Test Member",
                    authId: "Test Member", authProvider: "Test Member",
                    project: project });
            });
        }
    }, {
        key: "setupStatuses",
        value: function setupStatuses() {
            var _this7 = this;

            this.statusService.getItems().then(function (items) {
                if (items.length === 0) {
                    _this7.statusService.addItem({ name: "not started" });
                    _this7.statusService.addItem({ name: "in progress" });
                    _this7.statusService.addItem({ name: "impeded" });
                    _this7.statusService.addItem({ name: "done" });
                    _this7.statusService.addItem({ name: "rejected" });
                }
            });
        }
    }, {
        key: "readAll",
        value: function readAll() {
            var _this8 = this;

            this.teamMemberService.getItems().then(function (items) {
                console.log("teamMemberService", items);
                _this8.featureService.getItems().then(function (items) {
                    console.log("featureService", items);
                    _this8.userStoryService.getItems().then(function (items) {
                        console.log("userStoryService", items);
                        _this8.picsService.getPicDatas().then(function (items) {
                            console.log("picsService", items);
                            _this8.statusService.getItems().then(function (items) {
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
            var _this9 = this;

            this.teamMemberService.getItems().then(function (items) {
                console.log("teamMemberService items", items);
                for (var i = 0; i < items.length; i++) {
                    //console.log(items[i]);
                    items[i].currentProject = "55e61a9eb63286404af60c61";
                    _this9.teamMemberService.saveItem(items[i]);
                }
            });
        }
    }, {
        key: "setProjectForFeatures",
        value: function setProjectForFeatures() {
            var _this10 = this;

            this.featureService.getItems().then(function (items) {
                console.log("featureService items", items);
                for (var i = 0; i < items.length; i++) {
                    //console.log(items[i]);
                    items[i].project = "55e61a9eb63286404af60c61";
                    _this10.featureService.saveItem(items[i]);
                }
            });
        }
    }, {
        key: "setProjectForUserStories",
        value: function setProjectForUserStories() {
            var _this11 = this;

            this.userStoryService.getItems().then(function (items) {
                console.log("userStoryService items", items);
                for (var i = 0; i < items.length; i++) {
                    //console.log(items[i]);
                    items[i].project = "55e61a9eb63286404af60c61";
                    _this11.userStoryService.saveItem(items[i]);
                }
            });
        }
    }, {
        key: "setProjectForPictures",
        value: function setProjectForPictures() {
            var _this12 = this;

            this.picsService.getPicDatas().then(function (items) {
                console.log("picsService items", items);
                for (var i = 0; i < items.length; i++) {
                    //console.log(items[i]);
                    items[i].project = "55e61a9eb63286404af60c61";
                    _this12.picsService.savePic(items[i]);
                }
            });
        }
    }]);

    return C;
})();

angular.module("myApp").service("C", C);

//# sourceMappingURL=defaultsService-compiled.js.map