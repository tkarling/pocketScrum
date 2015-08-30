"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ADD_STATUS = "ADD_STATUS";
var REMOVE_STATUS = "REMOVE_STATUS";
var SAVE_STATUS = "SAVE_STATUS";

var statusActions = (function () {
    function statusActions(dispatcher) {
        _classCallCheck(this, statusActions);

        this.dispatcher = dispatcher;
    }

    _createClass(statusActions, [{
        key: "addStatus",
        value: function addStatus(item) {
            this.dispatcher.emit({
                actionType: ADD_STATUS,
                item: item
            });
        }
    }, {
        key: "removeStatus",
        value: function removeStatus(item) {
            this.dispatcher.emit({
                actionType: REMOVE_STATUS,
                item: item
            });
        }
    }, {
        key: "saveStatus",
        value: function saveStatus(item) {
            this.dispatcher.emit({
                actionType: SAVE_STATUS,
                item: item
            });
        }
    }]);

    return statusActions;
})();

angular.module("myApp").service("statusActions", statusActions);

var StatusStore = (function (_EventEmitter) {
    _inherits(StatusStore, _EventEmitter);

    function StatusStore(statusService) {
        _classCallCheck(this, StatusStore);

        _get(Object.getPrototypeOf(StatusStore.prototype), "constructor", this).call(this);
        this.statusService = statusService;

        this.statuses = [];
        this.errorMsg = "";

        this.emitChange();
    }

    _createClass(StatusStore, [{
        key: "getStatuses",
        value: function getStatuses() {
            return this.statuses;
        }
    }, {
        key: "getErrorMsg",
        value: function getErrorMsg() {
            return this.errorMsg;
        }
    }, {
        key: "addStatus",
        value: function addStatus(status) {
            var self = this;
            this.errorMsg = "";
            return this.statusService.addStatus(status).then(function (response) {}, function (error) {
                if (error.status > 0) {
                    console.log("addStatus error", error);
                    self.errorMsg = error.status + ': ' + error.statusText;
                }
            });
        }
    }, {
        key: "removeStatus",
        value: function removeStatus(status) {
            this.errorMsg = "";
            return this.statusService.removeStatus(status);
        }
    }, {
        key: "saveStatus",
        value: function saveStatus(status) {
            this.errorMsg = "";
            return this.statusService.saveStatus(status);
        }
    }, {
        key: "emitChange",
        value: function emitChange() {
            var self = this;
            this.statusService.getStatuses().then(function (statuses) {
                self.statuses = statuses;
                self.emit("change");
            });
        }
    }]);

    return StatusStore;
})(EventEmitter);

angular.module("myApp").service("statusStore", function (dispatcher, statusService) {
    var statusStore = new StatusStore(statusService);

    dispatcher.addListener(function (action) {
        switch (action.actionType) {
            case ADD_STATUS:
                statusStore.addStatus(action.item).then(function (response) {
                    statusStore.emitChange();
                });
                break;

            case REMOVE_STATUS:
                statusStore.removeStatus(action.item).then(function (response) {
                    statusStore.emitChange();
                });
                break;

            case SAVE_STATUS:
                statusStore.saveStatus(action.item).then(function (response) {
                    statusStore.emitChange();
                });
                break;

        }
    });

    //expose only the public interface
    this.addListener = function (l) {
        statusStore.addListener(l);
    };

    this.getStatuses = function () {
        return statusStore.getStatuses();
    };

    this.getErrorMsg = function () {
        return statusStore.getErrorMsg();
    };
});

//# sourceMappingURL=statusStore-compiled.js.map