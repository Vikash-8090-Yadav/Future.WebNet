"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapping = exports.source = void 0;
const gluegun_1 = require("gluegun");
const source = ({ contract }) => `
      account: '${contract}'`;
exports.source = source;
const mapping = ({ contractName }) => `
      apiVersion: 0.0.5
      language: wasm/assemblyscript
      entities:
        - ExampleEntity
      receiptHandlers:
        - handler: handleReceipt
      file: ./src/${gluegun_1.strings.kebabCase(contractName)}.ts`;
exports.mapping = mapping;
