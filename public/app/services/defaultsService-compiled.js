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

        this.setupDefaultsAndDBIfNeeded();

        //this.setupOneProject("My 5th Project");

        // FOR TESTING & DB FIXING
        //this.readAll();
        //this.setProjectForMembers();
        //this.setProjectForFeatures();
        //this.setStatusForUserStories();
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
            this.statusService.getItem("name", "not started").then(function (item) {
                _this.NOT_STARTED_STATUS_ID = item._id;
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
        key: "setupDefaultsAndDBIfNeeded",
        value: function setupDefaultsAndDBIfNeeded() {
            var _this2 = this;

            this.projectService.getItems().then(function (items) {
                if (items.length === 0) {
                    // setup DB, set default values & setup sample project
                    _this2.$q.all([_this2.setupDefaultFeatures(), _this2.setupDefaultMembers()]).then(function () {
                        _this2.getDefaultValues();
                        _this2.setupSampleProject("My 1st project");
                    });
                } else {
                    // just set default values
                    _this2.getDefaultValues();
                }
            });
        }
    }, {
        key: "setupSampleProject",
        value: function setupSampleProject(projectName) {
            var _this3 = this;

            this.addProject(projectName).then(function (addedProject) {
                _this3.setupSampleFeatures(addedProject._id);
                _this3.setupSampleMembers(addedProject._id);
            });
        }
    }, {
        key: "addProject",
        value: function addProject(name) {
            return this.projectService.addItem({ name: name }).then(function (addedItem) {
                return addedItem;
            });
        }
    }, {
        key: "setupDefaultFeatures",
        value: function setupDefaultFeatures() {
            var _this4 = this;

            return this.featureService.getItems().then(function (items) {
                if (items.length === 0) {
                    return _this4.featureService.addItem({ name: "All Features", noShow: true });
                }
            });
        }
    }, {
        key: "setupSampleFeatures",
        value: function setupSampleFeatures(project) {
            this.featureService.addItem({ name: "Feature1", project: project });
            this.featureService.addItem({ name: "Feature2", project: project });
        }
    }, {
        key: "setupDefaultMembers",
        value: function setupDefaultMembers() {
            var _this5 = this;

            return this.teamMemberService.getItems().then(function (items) {
                if (items.length === 0) {
                    return _this5.$q.all([_this5.teamMemberService.addItem({
                        name: "All Members", noShow: true,
                        authId: "All Members", authProvider: "All Members",
                        email: "All Members"
                    }), _this5.teamMemberService.addItem({
                        name: "Not Assigned",
                        authId: "Not Assigned", authProvider: "Not Assigned",
                        email: "Not Assigned"
                    })]);
                }
            });
        }
    }, {
        key: "setupSampleMembers",
        value: function setupSampleMembers(project) {
            this.teamMemberService.addItem({ name: "Test Member",
                authId: project, authProvider: "facebook",
                email: project,
                project: project });
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
        key: "setStatusForUserStories",
        value: function setStatusForUserStories() {
            var _this9 = this;

            this.userStoryService.getItems().then(function (items) {
                console.log("userStoryService items", items);
                for (var i = 0; i < items.length; i++) {
                    //console.log(items[i]);
                    items[i].status = _this9.NOT_STARTED_STATUS_ID;
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