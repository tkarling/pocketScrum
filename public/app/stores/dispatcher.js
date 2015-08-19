"use strict";

class EventEmitter {
    constructor() {
        this.listeners = [];
    }

    emit(event) {
        this.listeners.forEach(function (listener) {
            listener(event);
        });
    }

    addListener(listener) {
        this.listeners.push(listener);
        return this.listeners.length - 1;
    }
}

angular.module("myApp").service("dispatcher", EventEmitter);