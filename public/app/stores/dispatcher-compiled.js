"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = (function () {
    function EventEmitter() {
        _classCallCheck(this, EventEmitter);

        this.listeners = [];
    }

    _createClass(EventEmitter, [{
        key: "emit",
        value: function emit(event) {
            this.listeners.forEach(function (listener) {
                listener(event);
            });
        }
    }, {
        key: "addListener",
        value: function addListener(listener) {
            this.listeners.push(listener);
            return this.listeners.length - 1;
        }
    }]);

    return EventEmitter;
})();

angular.module("myApp").service("dispatcher", EventEmitter);

//# sourceMappingURL=dispatcher-compiled.js.map