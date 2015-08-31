// inspired by  http://jsfiddle.net/nawrockim/5Lk2V/10/

var previous;
var app = angular.module('visibilityClicker', []);
app.directive( "visibilityClicker", function(){
    return {
        replace: false,
        restrict: "AE",
        scope: {
            visiblity: "=",
            item: "=",
            ctrl: "="
        },
        link: function( $scope, lElem, lAttr ){
            lElem.on("click", function(e){
                //console.log("Element clicked.");
                if(previous) {
                    previous.menuVisible = false;
                    previous.featureMenuVisible = false;

                    if(previous.editName) {
                        previous.editName = false;
                        $scope.ctrl.saveStory(previous);
                        return;
                    }
                }

                $scope.$apply(function () {
                    $scope.visiblity = !$scope.visiblity;
                    previous = $scope.item;
                });

            });
        }
    }
});

