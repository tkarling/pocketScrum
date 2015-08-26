// inspired by http://codepen.io/parkji/pen/JtDro

var app = angular.module('dragDrop', []);
app.directive('draggable', function() {
    return function(scope, element) {
        // this gives us the native JS object
        var el = element[0];

        el.draggable = true;

        el.addEventListener(
            'dragstart',
            function(e) {
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
            function(e) {
                this.classList.remove('drag');
                //console.log("removed drag");
                return false;
            },
            false
        );
    }
});

app.directive('droppable', function() {
    return {
        scope: {
            drop: '&',
            moi: '@'
        },
        link: function(scope, element) {
            // again we need the native object
            var el = element[0];

            el.addEventListener(
                'dragover',
                function(e) {
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
                function(e) {
                    this.classList.add('over');
                    //console.log("added over from dragenter");
                    return false;
                },
                false
            );

            el.addEventListener(
                'dragleave',
                function(e) {
                    this.classList.remove('over');
                    //console.log("removed over from dragleave");
                    return false;
                },
                false
            );

            el.addEventListener(
                'drop',
                function(e) {
                    // Stops some browsers from redirecting.
                    if (e.stopPropagation) e.stopPropagation();

                    this.classList.remove('over');
                    //console.log("removed over from drop");

                    console.log("moi", scope.moi);
                    //scope.drop()("moi");
                    scope.drop()(scope.moi);

                    //var binId = this.id;
                    ////var item = document.getElementById(e.dataTransfer.getData('Text'));
                    ////this.appendChild(item);
                    //// call the passed drop function
                    //scope.$apply(function(scope) {
                    //    var fn = scope.drop();
                    //    if ('undefined' !== typeof fn) {
                    //        fn(item.id, binId);
                    //    }
                    //});

                    //scope.$apply(function(scope) {
                    //    console.log("in $apply");
                    //    //scope.drop();
                    //    var fn = scope.drop();
                    //    //if ('undefined' !== typeof fn) {
                    //        fn();
                    //    //}
                    //});

                    return false;
                },
                false
            );
        }
        //,
        //controller : function($scope){
        //    var exVm = this;
        //    exVm.min = 3;
        //    exVm.max = $scope.max;
        //    console.log('CTRL: $scope.max = %i', $scope.max);
        //    console.log('CTRL: exVm.min = %i', exVm.min);
        //    console.log('CTRL: exVm.max = %i', exVm.max);
        //},
        //controllerAs: 'exVm',
        //bindToController: true, //required in 1.3+ with controllerAs
    }
});


