"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateExampleEntityType = exports.generateEventType = exports.generateEventFields = exports.generateField = exports.protocolTypeToGraphQL = exports.abiEvents = void 0;
const types_1 = require("../codegen/types");
const util = __importStar(require("../codegen/util"));
function abiEvents(abi) {
    return util.disambiguateNames({
        // @ts-expect-error improve typings of disambiguateNames to handle iterables
        values: abi.data.filter(item => item.get('type') === 'event'),
        // @ts-expect-error improve typings of disambiguateNames to handle iterables
        getName: event => event.get('name'),
        // @ts-expect-error improve typings of disambiguateNames to handle iterables
        setName: (event, name) => event.set('_alias', name),
    });
}
exports.abiEvents = abiEvents;
const protocolTypeToGraphQL = (protocol, name) => {
    const ascType = (0, types_1.ascTypeForProtocol)(protocol, name);
    return (0, types_1.valueTypeForAsc)(ascType);
};
exports.protocolTypeToGraphQL = protocolTypeToGraphQL;
const generateField = ({ name, type, protocolName, }) => `${name}: ${(0, exports.protocolTypeToGraphQL)(protocolName, type)}! # ${type}`;
exports.generateField = generateField;
const generateEventFields = ({ index, input, protocolName, }) => input.type == 'tuple'
    ? util
        .unrollTuple({ value: input, path: [input.name || `param${index}`], index })
        .map(({ path, type }) => (0, exports.generateField)({ name: path.join('_'), type, protocolName }))
    : [
        (0, exports.generateField)({
            name: input.name || `param${index}`,
            type: input.type,
            protocolName,
        }),
    ];
exports.generateEventFields = generateEventFields;
const generateEventType = (event, protocolName) => `type ${event._alias} @entity(immutable: true) {
      id: Bytes!
      ${event.inputs
    .reduce((acc, input, index) => acc.concat((0, exports.generateEventFields)({ input, index, protocolName })), [])
    .join('\n')}
      blockNumber: BigInt!
      blockTimestamp: BigInt!
      transactionHash: Bytes!
    }`;
exports.generateEventType = generateEventType;
const generateExampleEntityType = (protocol, events) => {
    if (protocol.hasABIs() && events.length > 0) {
        return `type ExampleEntity @entity {
  id: Bytes!
  count: BigInt!
  ${events[0].inputs
            .reduce((acc, input, index) => acc.concat((0, exports.generateEventFields)({ input, index, protocolName: protocol.name })), [])
            .slice(0, 2)
            .join('\n')}
}`;
    }
    return `type ExampleEntity @entity {
  id: ID!
  block: Bytes!
  count: BigInt!
}`;
};
exports.generateExampleEntityType = generateExampleEntityType;
