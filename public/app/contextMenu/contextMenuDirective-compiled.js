// inspired by  http://jsfiddle.net/nawrockim/5Lk2V/10/

"use strict";

var previous;
var app = angular.module('visibilityClicker', []);
app.directive("visibilityClicker", function () {
    return {
        replace: false,
        restrict: "AE",
        scope: {
            visiblity: "=",
            item: "=",
            ctrl: "="
        },
        link: function link($scope, lElem, lAttr) {
            lElem.on("click", function (e) {
                if (previous) {
                    previous.menuVisible = false;
                    previous.featureMenuVisible = false;

                    if (previous.editName) {
                        $scope.ctrl.saveStory(previous);
                        previous.editName = false;
                    }
                }

                //console.log("Element right clicked.");
                $scope.$apply(function () {
                    $scope.visiblity = !$scope.visiblity;
                    previous = $scope.item;
                });
            });
        }
    };
});

//# sourceMappingURL=contextMenuDirective-compiled.js.map