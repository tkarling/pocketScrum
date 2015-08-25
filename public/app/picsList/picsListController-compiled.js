"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PicsListController = (function () {
    function PicsListController(MY_SERVER, picsStore, picsActions, Upload, $timeout) {
        _classCallCheck(this, PicsListController);

        this.url = MY_SERVER.url;
        this.picsStore = picsStore;
        this.picsActions = picsActions;
        this.Upload = Upload;
        this.$timeout = $timeout;
        this.resetPics();
        this.resetCurrentPic();

        this.picsBaseUrl = this.url + "/designpic";
        this.thumbnailUrl = this.url + "/thumbnail?id=";
        this.fullPicUrl = this.url + "/fullpic?id=";

        var self = this;
        picsStore.addListener(function () {
            self.resetPics();
            picsStore.addListener(function () {
                self.resetCurrentPic();
            });
        });
    }

    _createClass(PicsListController, [{
        key: "resetPics",
        value: function resetPics() {
            this.pics = this.picsStore.getPics();
            this.errorMsg = this.picsStore.getErrorMsg();
        }
    }, {
        key: "resetCurrentPic",
        value: function resetCurrentPic() {
            this.currentPic = this.picsStore.getCurrentPic();
        }
    }, {
        key: "addPic",
        value: function addPic(pic) {
            this.f = pic;
            this.picsActions.addPic(pic);
        }
    }, {
        key: "removePic",
        value: function removePic(pic, event) {
            this.f = undefined;
            this.picsActions.removePic(pic);
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
        }
    }, {
        key: "selectPic",
        value: function selectPic(pic) {
            this.savePic();
            if (pic._id !== this.currentPic._id) {
                this.f = undefined;
                //console.log("selectPic", pic);
                this.picsActions.selectPic(pic);
            }
        }
    }, {
        key: "savePic",
        value: function savePic() {
            if (this.currentPic._id) {
                this.picsActions.savePic(this.currentPic);
            }
        }
    }]);

    return PicsListController;
})();

angular.module("myApp").controller("PicsListController", PicsListController);

//# sourceMappingURL=picsListController-compiled.js.map