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
exports.generateEventIndexingHandlers = exports.generateEventFieldAssignments = exports.generateFieldAssignments = exports.generateFieldAssignment = void 0;
const util = __importStar(require("../codegen/util"));
const generateFieldAssignment = (path) => `entity.${path.join('_')} = event.params.${path.join('.')}`;
exports.generateFieldAssignment = generateFieldAssignment;
const generateFieldAssignments = ({ index, input }) => input.type === 'tuple'
    ? util
        .unrollTuple({ value: input, index, path: [input.name || `param${index}`] })
        .map(({ path }) => (0, exports.generateFieldAssignment)(path))
    : (0, exports.generateFieldAssignment)([input.name || `param${index}`]);
exports.generateFieldAssignments = generateFieldAssignments;
const generateEventFieldAssignments = (event) => event.inputs.reduce((acc, input, index) => acc.concat((0, exports.generateFieldAssignments)({ input, index })), []);
exports.generateEventFieldAssignments = generateEventFieldAssignments;
const generateEventIndexingHandlers = (events, contractName) => `
  import { ${events.map(event => `${event._alias} as ${event._alias}Event`)}} from '../generated/${contractName}/${contractName}'
  import { ${events.map(event => event._alias)} } from '../generated/schema'

  ${events
    .map(event => `
  export function handle${event._alias}(event: ${event._alias}Event): void {
    let entity = new ${event._alias}(event.transaction.hash.concatI32(event.logIndex.toI32()))
    ${(0, exports.generateEventFieldAssignments)(event).join('\n')}

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.save()
  }
    `)
    .join('\n')}
`;
exports.generateEventIndexingHandlers = generateEventIndexingHandlers;
