"use strict";

//defaults service

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var C = (function () {
    function C($http, $log, $q, projectService, statusService, userStoryService, featureService, teamMemberService, picsService, userStoryActions, featureActions, teamMemberActions) {
        var _this = this;

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

        this.teamMemberActions = teamMemberActions;
        this.featureActions = featureActions;
        this.userStoryActions = userStoryActions;

        this.setDefaultProject().then(function () {
            _this.setCurrentProjectForUrls();
            _this.getDefaultValues();
            _this.emitProjectSet();
        });

        console.log("init C", this);

        // FOR TESTING & DB FIXING
        //this.readAll();
        //this.setProjectForMembers();
        //this.setProjectForFeatures();
        //this.setProjectForUserStories();
        //this.setProjectForPictures();
    }

    _createClass(C, [{
        key: "setDefaultProject",
        value: function setDefaultProject() {
            var _this2 = this;

            return this.projectService.getItems().then(function (items) {
                if (items.length > 0) {
                    _this2.DEFAULT_PROJECT_ID = items[0]._id;
                    //console.log("this.DEFAULT_PROJECT_ID", this.DEFAULT_PROJECT_ID);
                } else {
                        return _this2.projectService.addItem({ name: "My 1st Project" }).then(function (newProject) {
                            _this2.DEFAULT_PROJECT_ID = newProject._id;
                        });
                    }
            });
        }
    }, {
        key: "emitProjectSet",
        value: function emitProjectSet() {
            this.teamMemberActions.projectSet();
            this.featureActions.projectSet();
            this.userStoryActions.projectSet();
        }
    }, {
        key: "setCurrentProjectForUrls",
        value: function setCurrentProjectForUrls() {
            //this.statusService.setCurrentProjectId(this.DEFAULT_PROJECT_ID);
            this.teamMemberService.setCurrentProjectId(this.DEFAULT_PROJECT_ID);
            this.userStoryService.setCurrentProjectId(this.DEFAULT_PROJECT_ID);
            this.featureService.setCurrentProjectId(this.DEFAULT_PROJECT_ID);
            //this.picsService.setCurrentProjectId(this.DEFAULT_PROJECT_ID);
        }
    }, {
        key: "getDefaultValues",
        value: function getDefaultValues() {
            var _this3 = this;

            this.ALL_FEATURES_NAME = "All Features";
            this.ALL_MEMBERS_NAME = "All Members";
            this.NOT_ASSIGNED_MEMBERS_NAME = "Not Assigned";
            this.statusService.getItem("name", "not started").then(function (item) {
                _this3.NOT_STARTED_STATUS_ID = item._id;
            });
        }

        //setupSampleProject(projectName) {
        //   return this.addProject(projectName).then((addedProject) => {
        //       this.setupSampleFeatures(addedProject._id);
        //       this.setupSampleMembers(addedProject._id);
        //   });
        //}
        //
        //addProject(name) {
        //    return this.projectService.addItem({name: name}).then((addedItem) => {
        //        return addedItem;
        //    });
        //}

        //setupSampleFeatures(project) {
        //    this.featureService.addItem({name: "Feature1", project: project});
        //    this.featureService.addItem({name: "Feature2", project: project});
        //}
        //setupSampleMembers(project) {
        //    this.teamMemberService.addItem({name: "Test Member",
        //        authId: project, authProvider: "facebook",
        //        email: project,
        //        currentProject: project});
        //}

    }, {
        key: "readAll",
        value: function readAll() {
            var _this4 = this;

            this.teamMemberService.getItems().then(function (items) {
                console.log("teamMemberService", items);
                _this4.featureService.getItems().then(function (items) {
                    console.log("featureService", items);
                    _this4.userStoryService.getItems().then(function (items) {
                        console.log("userStoryService", items);
                        _this4.picsService.getPicDatas().then(function (items) {
                            console.log("picsService", items);
                            _this4.statusService.getItems().then(function (items) {
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
            var _this5 = this;

            this.teamMemberService.getItems().then(function (items) {
                console.log("teamMemberService items", items);
                for (var i = 0; i < items.length; i++) {
                    //console.log(items[i]);
                    items[i].currentProject = "55e61a9eb63286404af60c61";
                    _this5.teamMemberService.saveItem(items[i]);
                }
            });
        }
    }, {
        key: "setProjectForFeatures",
        value: function setProjectForFeatures() {
            var _this6 = this;

            this.featureService.getItems().then(function (items) {
                console.log("featureService items", items);
                for (var i = 0; i < items.length; i++) {
                    //console.log(items[i]);
                    items[i].project = "55e61a9eb63286404af60c61";
                    _this6.featureService.saveItem(items[i]);
                }
            });
        }
    }, {
        key: "setProjectForUserStories",
        value: function setProjectForUserStories() {
            var _this7 = this;

            this.userStoryService.getItems().then(function (items) {
                console.log("userStoryService items", items);
                for (var i = 0; i < items.length; i++) {
                    //console.log(items[i]);
                    items[i].project = "55e87e9bb793347fd0da84ff";
                    _this7.userStoryService.saveItem(items[i]);
                }
            });
        }
    }, {
        key: "setProjectForPictures",
        value: function setProjectForPictures() {
            var _this8 = this;

            this.picsService.getPicDatas().then(function (items) {
                console.log("picsService items", items);
                for (var i = 0; i < items.length; i++) {
                    //console.log(items[i]);
                    items[i].project = "55e61a9eb63286404af60c61";
                    _this8.picsService.savePic(items[i]);
                }
            });
        }
    }]);

    return C;
})();

angular.module("defaults", []);
angular.module("defaults").service("C", C);

//# sourceMappingURL=defaultsService-compiled.js.map