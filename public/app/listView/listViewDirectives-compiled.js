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

"use strict";

angular.module("myApp").directive("listViewTools", function (featureActions) {
    return {
        restrict: "E",
        scope: {
            getThese: "="
        },
        controller: function controller($scope) {
            $scope.newItem = {};

            $scope.addItem = function () {
                if ($scope.newItem.name) {
                    featureActions.addFeature($scope.newItem);
                }
                $scope.newItem = "";
            };
        },
        //controller: listViewToolsController,
        //controllerAs: "lvTools",
        templateUrl: "./app/listView/listViewTools.html"
    };
});

//# sourceMappingURL=listViewDirectives-compiled.js.map