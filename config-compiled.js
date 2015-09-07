"use strict";

var config = module.exports = {};

if (process.env.NODE_ENV) {
    // PRODUCTION-SPECIFIC CONFIG //
    //config.portNum = 80;
    config.portNum = 3039;
    config.ip = "45.55.16.198";
} else {
    // DEVELOPMENT-SPECIFIC CONFIG //
    config.portNum = 3039;
    config.ip = "localhost";
}

//# sourceMappingURL=config-compiled.js.map