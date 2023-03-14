"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfWaffleIsInstalled = void 0;
const chalk_1 = __importDefault(require("chalk"));
function checkIfWaffleIsInstalled() {
    try {
        require.resolve("ethereum-waffle");
        console.warn(chalk_1.default.yellow(`You have both ethereum-waffle and @nomicfoundation/hardhat-chai-matchers installed. They don't work correctly together, so please make sure you only use one.

We recommend you migrate to @nomicfoundation/hardhat-chai-matchers. Learn how to do it here: https://hardhat.org/migrate-from-waffle`));
    }
    catch { }
}
exports.checkIfWaffleIsInstalled = checkIfWaffleIsInstalled;
//# sourceMappingURL=checkIfWaffleIsInstalled.js.map