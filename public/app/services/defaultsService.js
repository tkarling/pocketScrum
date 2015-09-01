"use strict";

class defaultsService {
    constructor($http, MY_SERVER, statusService, teamMemberService, userStoryService, featureService, picsService) {
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
                items[i].project = "55e61a9eb63286404af60c61";
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

angular.module("myApp").service("defaultsService", defaultsService);
