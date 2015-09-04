"use strict";

class ScrumBoardController {
    constructor(C, MY_SERVER, statusStore, userStoryStore, userStoryActions,
                featureStore, teamMemberStore) {
        this.C = C;
        this.url = MY_SERVER.url;
        var self = this;
        this.baseUrl = this.url + "/stories";
        this.thumbnailUrl = this.url + "/thumbnail?id=";
        this.newStory = {};
        this.menuVisible = false;

        this.userStoryStore = userStoryStore;
        this.userStoryActions = userStoryActions;
        this.resetStories();
        userStoryStore.addListener(function () {
            self.resetStories();
        });

        this.statusStore = statusStore;
        this.resetStatuses ();
        statusStore.addListener(function () {
            self.resetStatuses();
        });

        this.featureStore = featureStore;
        this.resetFeatures();
        featureStore.addListener(function () {
            self.resetFeatures();
        });

        this.teamMemberStore = teamMemberStore;
        this.resetTeamMembers();
        teamMemberStore.addListener(function () {
            self.resetTeamMembers();
        });
    }

    featureSelected() {
        return this.currentFeature && this.currentFeature._id;
    }

    get currentFeatureId() {
        return this.featureSelected(this) ? this.currentFeature._id : "";
    }

    get currentMemberId() {
        var memberSelected = function(self) {
            return self.currentMember && self.currentMember._id;
        }

        var notAssigned = function(self) {
            return self.currentMember.name === "not assigned";
        }

        return memberSelected(this) ? this.currentMember._id :
            notAssigned(this) ? null : "";
    }

    resetStatuses() {
        var NO_OF_GROUPS = 4;
        this.statuses = this.statusStore.getStatuses();
        this.statuses.splice(NO_OF_GROUPS, this.statuses.length - NO_OF_GROUPS);
    }

    resetFeatures() {
        this.features = this.featureStore.getFeatures();
        this.features.unshift({name:"All Features", noShow:true});
        this.currentFeature = this.features[0];
    }

    resetTeamMembers() {
        this.teamMembers = this.teamMemberStore.getTeamMembers();
        this.teamMembers.unshift({name:"not assigned", noShow:false });
        this.teamMembers.unshift({name:"All Team Members", noShow:true});
        this.currentMember= this.teamMembers[0]
    }

    resetStories() {
        this.stories = this.userStoryStore.getStories();
        this.errorMsg = this.userStoryStore.getErrorMsg();
        this.newStory = {};
    }

    addStory(story) {
        if(this.newStory.name) {
            this.newStory.feature = this.currentFeature._id;
            this.userStoryActions.addStory(this.newStory);
        }
    }

    removeStory(story, event) {
        this.userStoryActions.removeStory(story);
        if(event){
            event.stopPropagation();
            event.preventDefault();
        }
    }

    saveStory(story) {
        this.userStoryActions.saveStory(story);
    }

    setStoryFeature(story, feature) {
        story.feature = feature._id;
        this.userStoryActions.saveStory(story);
    }

    setStoryAssignedTo(story, member) {
        story.assignedTo = (member.name === "not assigned") ? null : member._id;
        this.userStoryActions.saveStory(story);
    }

    setDraggedStory(story) {
        this.draggedStory = story;
    }

    setStatus(status) {
        this.draggedStory.status = status;
        this.userStoryActions.saveStory(this.draggedStory);
        this.draggedStory = undefined;
    }


}

angular.module("myApp").controller("ScrumBoardController", ScrumBoardController);