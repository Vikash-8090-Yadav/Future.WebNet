"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapping = exports.source = void 0;
const source = () => `
      startBlock: 0`;
exports.source = source;
const mapping = () => `
      apiVersion: 0.0.5
      language: wasm/assemblyscript
      entities:
        - ExampleEntity
      blockHandlers:
        - handler: handleBlock
      file: ./src/contract.ts`;
exports.mapping = mapping;
