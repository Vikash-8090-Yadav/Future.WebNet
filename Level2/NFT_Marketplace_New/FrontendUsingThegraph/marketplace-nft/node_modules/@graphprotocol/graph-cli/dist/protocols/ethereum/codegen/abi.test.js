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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const immutable_1 = __importDefault(require("immutable"));
const ts = __importStar(require("../../../codegen/typescript"));
const abi_1 = __importDefault(require("../abi"));
const abi_2 = __importDefault(require("./abi"));
let tempdir;
let abi;
let generatedTypes;
describe('ABI code generation', () => {
    beforeAll(async () => {
        tempdir = await fs_extra_1.default.mkdtemp('abi-codegen');
        try {
            const filename = path_1.default.join(tempdir, 'ABI.json');
            await fs_extra_1.default.writeFile(filename, JSON.stringify([
                {
                    constant: true,
                    inputs: [],
                    name: 'read',
                    outputs: [{ name: '', type: 'bytes32' }],
                    payable: false,
                    type: 'function',
                },
                {
                    constant: true,
                    inputs: [
                        {
                            name: 'proposalId',
                            type: 'uint256',
                        },
                        {
                            components: [
                                {
                                    name: 'foo',
                                    type: 'uint8',
                                },
                                {
                                    name: 'bar',
                                    type: 'tuple',
                                    components: [{ name: 'baz', type: 'address' }],
                                },
                            ],
                            name: '',
                            type: 'tuple',
                        },
                    ],
                    name: 'getProposal',
                    outputs: [
                        {
                            components: [
                                {
                                    name: 'result',
                                    type: 'uint8',
                                },
                                {
                                    name: 'target',
                                    type: 'address',
                                },
                                {
                                    name: 'data',
                                    type: 'bytes',
                                },
                                {
                                    name: 'proposer',
                                    type: 'address',
                                },
                                {
                                    name: 'feeRecipient',
                                    type: 'address',
                                },
                                {
                                    name: 'fee',
                                    type: 'uint256',
                                },
                                {
                                    name: 'startTime',
                                    type: 'uint256',
                                },
                                {
                                    name: 'yesCount',
                                    type: 'uint256',
                                },
                                {
                                    name: 'noCount',
                                    type: 'uint256',
                                },
                            ],
                            name: '',
                            type: 'tuple',
                        },
                    ],
                    payable: false,
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    type: 'function',
                    stateMutability: 'view',
                    payable: 'false',
                    name: 'getProposals',
                    outputs: [
                        {
                            type: 'uint256',
                            name: 'size',
                        },
                        {
                            type: 'tuple[]',
                            components: [
                                { name: 'first', type: 'uint256' },
                                { name: 'second', type: 'string' },
                            ],
                        },
                    ],
                },
                {
                    type: 'function',
                    stateMutability: 'view',
                    name: 'overloaded',
                    inputs: [
                        {
                            type: 'string',
                        },
                    ],
                    outputs: [
                        {
                            type: 'string',
                        },
                    ],
                },
                {
                    type: 'function',
                    stateMutability: 'view',
                    name: 'overloaded',
                    inputs: [
                        {
                            type: 'uint256',
                        },
                    ],
                    outputs: [
                        {
                            type: 'string',
                        },
                    ],
                },
                {
                    type: 'function',
                    stateMutability: 'view',
                    name: 'overloaded',
                    inputs: [
                        {
                            type: 'bytes32',
                        },
                    ],
                    outputs: [
                        {
                            type: 'string',
                        },
                    ],
                },
            ]), 'utf-8');
            abi = abi_1.default.load('Contract', filename);
            const codegen = new abi_2.default(abi);
            generatedTypes = codegen.generateTypes();
        }
        finally {
            await fs_extra_1.default.remove(tempdir);
        }
    });
    afterAll(async () => {
        await fs_extra_1.default.remove(tempdir);
    });
    describe('Generated types', () => {
        test('All expected types are generated', () => {
            expect(generatedTypes.map(type => type.name)).toEqual([
                'Contract__getProposalResultValue0Struct',
                'Contract__getProposalInputParam1Struct',
                'Contract__getProposalInputParam1BarStruct',
                'Contract__getProposalsResultValue1Struct',
                'Contract__getProposalsResult',
                'Contract',
            ]);
        });
    });
    describe('Contract class', () => {
        test('Exists', () => {
            expect(generatedTypes.find(type => type.name === 'Contract')).toBeDefined();
        });
        test('Has methods', () => {
            const contract = generatedTypes.find(type => type.name === 'Contract');
            expect(contract.methods).toBeInstanceOf(Array);
        });
        test('Has `bind` method', () => {
            const contract = generatedTypes.find(type => type.name === 'Contract');
            expect(contract.methods.find((method) => method.name === 'bind')).toBeDefined();
        });
        test('Has methods for all callable functions', () => {
            const contract = generatedTypes.find(type => type.name === 'Contract');
            expect(contract.methods.map((method) => method.name)).toContain('getProposal');
        });
    });
    describe('Methods for callable functions', () => {
        test('Have correct parameters', () => {
            const contract = generatedTypes.find(type => type.name === 'Contract');
            expect(contract.methods.map((method) => [method.name, method.params])).toEqual([
                ['bind', immutable_1.default.List([ts.param('address', 'Address')])],
                ['read', immutable_1.default.List()],
                ['try_read', immutable_1.default.List()],
                [
                    'getProposal',
                    immutable_1.default.List([
                        ts.param('proposalId', 'BigInt'),
                        ts.param('param1', 'Contract__getProposalInputParam1Struct'),
                    ]),
                ],
                [
                    'try_getProposal',
                    immutable_1.default.List([
                        ts.param('proposalId', 'BigInt'),
                        ts.param('param1', 'Contract__getProposalInputParam1Struct'),
                    ]),
                ],
                ['getProposals', immutable_1.default.List()],
                ['try_getProposals', immutable_1.default.List()],
                ['overloaded', immutable_1.default.List([ts.param('param0', 'string')])],
                ['try_overloaded', immutable_1.default.List([ts.param('param0', 'string')])],
                ['overloaded1', immutable_1.default.List([ts.param('param0', 'BigInt')])],
                ['try_overloaded1', immutable_1.default.List([ts.param('param0', 'BigInt')])],
                ['overloaded2', immutable_1.default.List([ts.param('param0', 'Bytes')])],
                ['try_overloaded2', immutable_1.default.List([ts.param('param0', 'Bytes')])],
            ]);
        });
        test('Have correct return types', () => {
            const contract = generatedTypes.find(type => type.name === 'Contract');
            expect(contract.methods.map((method) => [method.name, method.returnType])).toEqual([
                ['bind', ts.namedType('Contract')],
                ['read', ts.namedType('Bytes')],
                ['try_read', 'ethereum.CallResult<Bytes>'],
                ['getProposal', ts.namedType('Contract__getProposalResultValue0Struct')],
                ['try_getProposal', 'ethereum.CallResult<Contract__getProposalResultValue0Struct>'],
                ['getProposals', ts.namedType('Contract__getProposalsResult')],
                ['try_getProposals', 'ethereum.CallResult<Contract__getProposalsResult>'],
                ['overloaded', ts.namedType('string')],
                ['try_overloaded', 'ethereum.CallResult<string>'],
                ['overloaded1', ts.namedType('string')],
                ['try_overloaded1', 'ethereum.CallResult<string>'],
                ['overloaded2', ts.namedType('string')],
                ['try_overloaded2', 'ethereum.CallResult<string>'],
            ]);
        });
    });
    describe('Tuples', () => {
        test('Tuple types exist for function parameters', () => {
            let tupleType = generatedTypes.find(type => type.name === 'Contract__getProposalInputParam1Struct');
            // Verify that the tuple type has methods
            expect(tupleType.methods).toBeDefined();
            // Verify that the tuple type has getters for all tuple fields with
            // the right return types
            expect(tupleType.methods.map((method) => [method.name, method.returnType])).toEqual([
                ['get foo', 'i32'],
                ['get bar', 'Contract__getProposalInputParam1BarStruct'],
            ]);
            // Inner tuple:
            tupleType = generatedTypes.find(type => type.name === 'Contract__getProposalInputParam1BarStruct');
            // Verify that the tuple type has methods
            expect(tupleType.methods).toBeDefined();
            // Verify that the tuple type has getters for all tuple fields with
            // the right return types
            expect(tupleType.methods.map((method) => [method.name, method.returnType])).toEqual([
                ['get baz', 'Address'],
            ]);
        });
        test('Tuple types exist for function return values', () => {
            const tupleType = generatedTypes.find(type => type.name === 'Contract__getProposalResultValue0Struct');
            // Verify that the tuple type has methods
            expect(tupleType.methods).toBeDefined();
            // Verify that the tuple type has getters for all tuple fields with
            // the right return types
            expect(tupleType.methods.map((method) => [method.name, method.returnType])).toEqual([
                ['get result', 'i32'],
                ['get target', 'Address'],
                ['get data', 'Bytes'],
                ['get proposer', 'Address'],
                ['get feeRecipient', 'Address'],
                ['get fee', 'BigInt'],
                ['get startTime', 'BigInt'],
                ['get yesCount', 'BigInt'],
                ['get noCount', 'BigInt'],
            ]);
        });
        test('Function bodies are generated correctly for tuple arrays', () => {
            const contract = generatedTypes.find(type => type.name === 'Contract');
            const getter = contract.methods.find((method) => method.name === 'getProposals');
            expect(getter.body).not.toContain('toTupleArray<undefined>');
            expect(getter.body).toContain('result[1].toTupleArray<Contract__getProposalsResultValue1Struct>()');
        });
    });
});
