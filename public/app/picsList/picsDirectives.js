class picsToolsController {
    constructor() {
        this.test = "hello from picsToolsController";
    }
}

angular.module("myApp").directive( "picsTools", function(){
    return {
        restrict: "E",
        controller: picsToolsController,
        controllerAs: "picsTools",
        templateUrl: "./app/picsList/picsTools.html"
    }
});

class picsGridController {
    constructor() {
        this.test = "hello from picsGridController";
    }
}

angular.module("myApp").directive( "picsGrid", function(){
    return {
        restrict: "E",
        controller: picsGridController,
        controllerAs: "picsGrid",
        templateUrl: "./app/picsList/picsGrid.html"
    }
});


class picDetailsController {
    constructor() {
        this.test = "hello from picDetailsController";
    }
}

angular.module("myApp").directive( "picDetails", function(){
    return {
        restrict: "E",
        controller: picDetailsController,
        controllerAs: "picDetails",
        templateUrl: "./app/picsList/picDetails.html"
    }
});
