"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (ms = 1000) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};
