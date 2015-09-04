"use strict";

//defaults service
class C {
    constructor($http, $log, $q, projectService, statusService, userStoryService,
                featureService, teamMemberService, picsService,
                userStoryActions, featureActions, teamMemberActions) {
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

        this.setDefaultProject().then(()=> {
            this.setCurrentProjectForUrls();
            this.getDefaultValues();
            this.emitProjectSet();
        });

        console.log("init C", this);

        // FOR TESTING & DB FIXING
        //this.readAll();
        //this.setProjectForMembers();
        //this.setProjectForFeatures();
        //this.setProjectForUserStories();
        //this.setProjectForPictures();
    }


    setDefaultProject() {
        return this.projectService.getItems().then((items)=>{
            if(items.length > 0) {
                this.DEFAULT_PROJECT_ID = items[0]._id;
                //console.log("this.DEFAULT_PROJECT_ID", this.DEFAULT_PROJECT_ID);
            } else {
                return this.projectService.addItem({name: "My 1st Project"}).then((newProject) => {
                    this.DEFAULT_PROJECT_ID = newProject._id;
                });
            }
        });
    }

    emitProjectSet () {
        this.teamMemberActions.projectSet();
        this.featureActions.projectSet();
        this.userStoryActions.projectSet();
    }


    setCurrentProjectForUrls() {
        //this.statusService.setCurrentProjectId(this.DEFAULT_PROJECT_ID);
        this.teamMemberService.setCurrentProjectId(this.DEFAULT_PROJECT_ID);
        this.userStoryService.setCurrentProjectId(this.DEFAULT_PROJECT_ID);
        this.featureService.setCurrentProjectId(this.DEFAULT_PROJECT_ID);
        //this.picsService.setCurrentProjectId(this.DEFAULT_PROJECT_ID);
    }

    getDefaultValues () {
        this.ALL_FEATURES_NAME = "All Features";
        this.ALL_MEMBERS_NAME = "All Members";
        this.NOT_ASSIGNED_MEMBERS_NAME = "Not Assigned";
        this.statusService.getItem("name", "not started").then((item)=> {
            this.NOT_STARTED_STATUS_ID = item._id;
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


    readAll() {
        this.teamMemberService.getItems().then((items) => {
            console.log("teamMemberService", items);
            this.featureService.getItems().then((items) => {
                console.log("featureService", items);
                this.userStoryService.getItems().then((items) => {
                    console.log("userStoryService", items);
                    this.picsService.getPicDatas().then((items) => {
                        console.log("picsService", items);
                        this.statusService.getItems().then((items) => {
                            console.log("statusService", items);
                        });
                    });
                });
            });
        });
    }

    setProjectForMembers() {
        this.teamMemberService.getItems().then((items) => {
            console.log("teamMemberService items", items);
            for (var i = 0; i < items.length; i++) {
                //console.log(items[i]);
                items[i].currentProject = "55e61a9eb63286404af60c61";
                this.teamMemberService.saveItem(items[i]);
            }
        });
    }

    setProjectForFeatures() {
        this.featureService.getItems().then((items) => {
            console.log("featureService items", items);
            for (var i = 0; i < items.length; i++) {
                //console.log(items[i]);
                items[i].project = "55e61a9eb63286404af60c61";
                this.featureService.saveItem(items[i]);
            }
        });
    }

    setProjectForUserStories() {
        this.userStoryService.getItems().then((items) => {
            console.log("userStoryService items", items);
            for (var i = 0; i < items.length; i++) {
                //console.log(items[i]);
                items[i].project = "55e87e9bb793347fd0da84ff";
                this.userStoryService.saveItem(items[i]);
            }
        });
    }

    setProjectForPictures() {
        this.picsService.getPicDatas().then((items) => {
            console.log("picsService items", items);
            for (var i = 0; i < items.length; i++) {
                //console.log(items[i]);
                items[i].project = "55e61a9eb63286404af60c61";
                this.picsService.savePic(items[i]);
            }
        });
    }

}

angular.module("defaults", []);
angular.module("defaults").service("C", C);
