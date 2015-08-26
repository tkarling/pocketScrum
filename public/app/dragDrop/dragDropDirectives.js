// inspired by http://codepen.io/parkji/pen/JtDro

var app = angular.module('dragDrop', []);
app.directive('draggable', function () {
    return {
        scope: {
            drDragend: '&',
            drStory: '=',
            drCtrl: '=',
            drIndex:  '@'
        }
        ,
        link: function (scope, element) {
            // this gives us the native JS object
            var el = element[0];

            el.draggable = true;

            el.addEventListener(
                'dragstart',
                function (e) {
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('Text', this.id);
                    this.classList.add('drag');
                    //console.log("added drag");
                    return false;
                },
                false
            );

            el.addEventListener(
                'dragend',
                function (e) {
                    this.classList.remove('drag');
                    scope.drDragend()(scope.drCtrl, scope.drStory);
                    return false;
                },
                false
            );
        }
    }
});

app.directive('droppable', function ($timeout) {
    return {
        scope: {
            drop: '&',
            newStatus: '@',
            ctrl: '='
        },
        link: function (scope, element) {
            // again we need the native object
            var el = element[0];

            el.addEventListener(
                'dragover',
                function (e) {
                    e.dataTransfer.dropEffect = 'move';
                    // allows us to drop
                    if (e.preventDefault) e.preventDefault();
                    this.classList.add('over');
                    //console.log("added over from dragover");
                    return false;
                },
                false
            );

            el.addEventListener(
                'dragenter',
                function (e) {
                    this.classList.add('over');
                    //console.log("added over from dragenter");
                    return false;
                },
                false
            );

            el.addEventListener(
                'dragleave',
                function (e) {
                    this.classList.remove('over');
                    //console.log("removed over from dragleave");
                    return false;
                },
                false
            );

            el.addEventListener(
                'drop',
                function (e) {
                    // Stops some browsers from redirecting.
                    if (e.stopPropagation) e.stopPropagation();

                    this.classList.remove('over');
                    $timeout(function () {
                        scope.drop()(scope.ctrl, scope.newStatus);

                    }, 300);

                    return false;
                },
                false
            );
        }
    }
});


