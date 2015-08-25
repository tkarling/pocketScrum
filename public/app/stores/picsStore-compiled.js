"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ADD_PIC = "ADD_PIC";
var REMOVE_PIC = "REMOVE_PIC";
var SELECT_PIC = "SELECT_PIC";
var SAVE_PIC = "SAVE_PIC";

var picsActions = (function () {
    function picsActions(dispatcher) {
        _classCallCheck(this, picsActions);

        this.dispatcher = dispatcher;
    }

    _createClass(picsActions, [{
        key: "addPic",
        value: function addPic(item) {
            this.dispatcher.emit({
                actionType: ADD_PIC,
                item: item
            });
        }
    }, {
        key: "removePic",
        value: function removePic(item) {
            this.dispatcher.emit({
                actionType: REMOVE_PIC,
                item: item
            });
        }
    }, {
        key: "selectPic",
        value: function selectPic(item) {
            this.dispatcher.emit({
                actionType: SELECT_PIC,
                item: item
            });
        }
    }, {
        key: "savePic",
        value: function savePic(item) {
            this.dispatcher.emit({
                actionType: SAVE_PIC,
                item: item
            });
        }
    }]);

    return picsActions;
})();

angular.module("myApp").service("picsActions", picsActions);

var PicsStore = (function (_EventEmitter) {
    _inherits(PicsStore, _EventEmitter);

    function PicsStore(picsService) {
        _classCallCheck(this, PicsStore);

        _get(Object.getPrototypeOf(PicsStore.prototype), "constructor", this).call(this);
        this.picsService = picsService;

        this.pics = [];
        this.currentPic = {};
        this.errorMsg = "";

        this.emitSetChange();
    }

    _createClass(PicsStore, [{
        key: "getPics",
        value: function getPics() {
            return this.pics;
        }
    }, {
        key: "getCurrentPic",
        value: function getCurrentPic() {
            return this.currentPic;
        }
    }, {
        key: "getErrorMsg",
        value: function getErrorMsg() {
            return this.errorMsg;
        }
    }, {
        key: "addPic",
        value: function addPic(pic) {
            //this.pics.push({qty: 1, pic: pic});
            var self = this;
            this.errorMsg = "";
            self.currentPic = {};
            return this.picsService.addPic(pic).then(function (response) {
                self.currentPic = response.data;
            }, function (error) {
                if (error.status > 0) {
                    console.log("addPic error", error);
                    self.errorMsg = error.status + ': ' + error.statusText;
                    //self.currentPic = {};
                }
            }, function (evt) {
                self.currentPic.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                self.emitSetChange();
            });
        }
    }, {
        key: "removePic",
        value: function removePic(pic) {
            this.errorMsg = "";
            if (this.currentPic.picId == pic.picId) {
                this.currentPic = {};
            }
            return this.picsService.removePic(pic);
        }
    }, {
        key: "savePic",
        value: function savePic(pic) {
            this.errorMsg = "";
            return this.picsService.savePic(pic);
        }
    }, {
        key: "selectPic",
        value: function selectPic(pic) {
            this.errorMsg = "";
            this.currentPic = pic;
        }
    }, {
        key: "emitSetChange",
        value: function emitSetChange() {
            var self = this;
            this.picsService.getPicDatas().then(function (picDatas) {
                self.pics = picDatas;
                self.emit("change");
            });
        }
    }, {
        key: "emitChange",
        value: function emitChange() {
            this.emit("change");
        }
    }]);

    return PicsStore;
})(EventEmitter);

angular.module("myApp").service("picsStore", function (dispatcher, picsService) {
    var picsStore = new PicsStore(picsService);

    dispatcher.addListener(function (action) {
        switch (action.actionType) {
            case ADD_PIC:
                picsStore.addPic(action.item).then(function (response) {
                    picsStore.emitSetChange();
                });
                break;

            case REMOVE_PIC:
                picsStore.removePic(action.item).then(function (response) {
                    picsStore.emitSetChange();
                });
                break;

            case SAVE_PIC:
                picsStore.savePic(action.item).then(function (response) {
                    picsStore.emitSetChange();
                });
                break;

            case SELECT_PIC:
                picsStore.selectPic(action.item);
                picsStore.emitChange();
                break;
        }
    });

    //expose only the public interface
    this.addListener = function (l) {
        picsStore.addListener(l);
    };

    this.getPics = function () {
        return picsStore.getPics();
    };

    this.getCurrentPic = function () {
        return picsStore.getCurrentPic();
    };

    this.getErrorMsg = function () {
        return picsStore.getErrorMsg();
    };
});

//# sourceMappingURL=picsStore-compiled.js.map