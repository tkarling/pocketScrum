"use strict";

//defaults service
class C {
    constructor($http, $log, $q, statusService, teamMemberService, userStoryService,
                featureService, projectService, picsService) {
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

    getDefaultValues () {
        this.featureService.getItem("name", "All Features").then((item)=>{
            this.ALL_FEATURES_ID = item._id;
        });
        this.teamMemberService.getItem("name", "All Members").then((item)=>{
            this.ALL_MEMBERS_ID = item._id;
        });
        this.teamMemberService.getItem("name", "Not Assigned").then((item)=>{
            this.NOT_SET_MEMBER_ID = item._id;
        });
        this.statusService.getItem("name", "not started").then((item)=>{
            this.NOT_STARTED_STATUS_ID = item._id;
        });
        this.picsService.getPicData("keywords[0]", "default member pic").then((item)=>{
            //console.log("item", item);
            if(item) {
                this.DEFAULT_MEMBER_PIC_ID = item.picId;
                //console.log("this.DEFAULT_MEMBER_PIC_ID", this.DEFAULT_MEMBER_PIC_ID);
            } else {
                this.$log.error("no MEMBER PIC");
            }
        });
        this.projectService.getItems().then((items)=>{
            if(items.length > 0) {
                this.DEFAULT_PROJECT_ID = items[0]._id;
                //console.log("this.DEFAULT_PROJECT_ID", this.DEFAULT_PROJECT_ID);
            } else {
                this.$log.error("no default project");
            }
        });
    }

    setupDefaultsAndDBIfNeeded() {
        this.projectService.getItems().then((items) => {
            if (items.length === 0) {
                // setup DB, set default values & setup sample project
                this.$q.all([this.setupDefaultFeatures(),
                    this.setupDefaultMembers()]).then(() => {
                    this.getDefaultValues();
                    this.setupSampleProject("My 1st project");
                });
            } else {
                // just set default values
                this.getDefaultValues();
            }
        });
    }


    setupSampleProject(projectName) {
       this.addProject(projectName).then((addedProject) => {
           this.setupSampleFeatures(addedProject._id);
           this.setupSampleMembers(addedProject._id);
       });
    }

    addProject(name) {
        return this.projectService.addItem({name: name}).then((addedItem) => {
            return addedItem;
        });
    }

    setupDefaultFeatures() {
        return this.featureService.getItems().then((items) => {
            if (items.length === 0) {
                return this.featureService.addItem({name: "All Features", noShow: true,});
            }
        });
    }

    setupSampleFeatures(project) {
        this.featureService.addItem({name: "Feature1", project: project});
        this.featureService.addItem({name: "Feature2", project: project});
    }

    setupDefaultMembers() {
        return this.teamMemberService.getItems().then((items) => {
            if (items.length === 0) {
                return this.$q.all([
                    this.teamMemberService.addItem({
                        name: "All Members", noShow: true,
                        authId: "All Members", authProvider: "All Members",
                        email: "All Members"
                    }),
                    this.teamMemberService.addItem({
                        name: "Not Assigned",
                        authId: "Not Assigned", authProvider: "Not Assigned",
                        email: "Not Assigned"
                    })]);
            }
        });
    }

    setupSampleMembers(project) {
        this.teamMemberService.addItem({name: "Test Member",
            authId: project, authProvider: "facebook",
            email: project,
            project: project});
    }
    

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

    setStatusForUserStories() {
        this.userStoryService.getItems().then((items) => {
            console.log("userStoryService items", items);
            for (var i = 0; i < items.length; i++) {
                //console.log(items[i]);
                items[i].status = this.NOT_STARTED_STATUS_ID;
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

angular.module("myApp").service("C", C);
