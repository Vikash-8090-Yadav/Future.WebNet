"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapping = exports.source = void 0;
const source = ({ contract }) => `
      owner: '${contract}'`;
exports.source = source;
const mapping = () => `
      apiVersion: 0.0.5
      language: wasm/assemblyscript
      entities:
        - Block
        - Transaction
      blockHandlers:
        - handler: handleBlock
      transactionHandlers:
        - handler: handleTx
      file: ./src/mapping.ts`;
exports.mapping = mapping;
