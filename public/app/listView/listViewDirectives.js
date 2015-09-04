//class listViewToolsController {
//    constructor(featureActions) {
//        this.test = "hello from listViewToolsController";
//    }
//
//
//    addItem(item) {
//        if(this.newItem.name) {
//            this.featureActions.addFeature(this.newItem);
//        }
//    }
//}

angular.module("myApp").directive( "listViewTools", function(featureActions){
    return {
        restrict: "E",
        scope: {
            visible: "=",
            item: "="
        },
        controller: function($scope) {
            $scope.newItem = {};

            $scope.addItem = function() {
                if($scope.newItem.name) {
                    featureActions.addFeature($scope.newItem);
                }
            }

        },
        //controller: listViewToolsController,
        //controllerAs: "lvTools",
        templateUrl: "./app/listView/listViewTools.html"
    }
});
