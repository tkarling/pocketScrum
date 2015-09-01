"use strict";

var config = module.exports = {};

if (process.env.NODE_ENV) {
    // PRODUCTION-SPECIFIC CONFIG //
    config.portNum = 80;
} else {
    // DEVELOPMENT-SPECIFIC CONFIG //
    config.portNum = 3039;
}

//# sourceMappingURL=config-compiled.js.map