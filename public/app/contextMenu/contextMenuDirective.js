// inspired by  http://jsfiddle.net/nawrockim/5Lk2V/10/

var previous;
var app = angular.module('contextMenu', []);
app.directive( "contextMenu", function(){
    return {
        replace: false,
        restrict: "AE",
        scope: {
            visible: "=",
            item: "=",
            ctrl: "="
        },
        link: function( $scope, lElem, lAttr ){
            lElem.on("click", function(e){
                if(previous) {
                    previous.menuVisible = false;
                    previous.featureMenuVisible = false;

                    if(previous.editName) {
                        $scope.ctrl.saveStory(previous);
                        previous.editName = false;
                    }
                }

                //console.log("Element right clicked.");

                $scope.$apply(function () {
                    $scope.visible = !$scope.visible;
                    previous = $scope.item;
                });

            });
        }
    }
});

