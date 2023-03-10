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
const toolbox = __importStar(require("gluegun"));
const yaml_1 = __importDefault(require("yaml"));
const network_1 = require("./network");
const SUBGRAPH_PATH_BASE = path_1.default.join(__dirname, '..', '..', '..', '..', 'examples', 'example-subgraph');
describe('initNetworksConfig', () => {
    beforeAll(async () => {
        await (0, network_1.initNetworksConfig)(SUBGRAPH_PATH_BASE, 'address');
    });
    afterAll(async () => {
        toolbox.filesystem.remove(`${SUBGRAPH_PATH_BASE}/networks.json`);
    });
    test('generates networks.json from subgraph.yaml', () => {
        expect(toolbox.filesystem.exists(`${SUBGRAPH_PATH_BASE}/networks.json`)).toBe('file');
    });
    test('Populates the networks.json file with the data from subgraph.yaml', async () => {
        const networksStr = toolbox.filesystem.read(`${SUBGRAPH_PATH_BASE}/networks.json`);
        const networks = JSON.parse(networksStr);
        const expected = {
            mainnet: {
                ExampleSubgraph: { address: '0x22843e74c59580b3eaf6c233fa67d8b7c561a835' },
            },
        };
        expect(networks).toStrictEqual(expected);
    });
});
describe('updateSubgraphNetwork', () => {
    beforeAll(async () => {
        const content = {
            optimism: {
                ExampleSubgraph: { address: '0x12345...' },
            },
        };
        toolbox.filesystem.write(`${SUBGRAPH_PATH_BASE}/networks.json`, content);
        toolbox.filesystem.copy(`${SUBGRAPH_PATH_BASE}/subgraph.yaml`, `${SUBGRAPH_PATH_BASE}/subgraph_copy.yaml`);
    });
    afterAll(async () => {
        toolbox.filesystem.remove(`${SUBGRAPH_PATH_BASE}/networks.json`);
        toolbox.filesystem.remove(`${SUBGRAPH_PATH_BASE}/subgraph_copy.yaml`);
    });
    test('Updates subgraph.yaml', async () => {
        const manifest = `${SUBGRAPH_PATH_BASE}/subgraph_copy.yaml`;
        const networksFie = `${SUBGRAPH_PATH_BASE}/networks.json`;
        let subgraph = toolbox.filesystem.read(manifest);
        let subgraphObj = yaml_1.default.parse(subgraph);
        let network = subgraphObj.dataSources[0].network;
        let address = subgraphObj.dataSources[0].source.address;
        expect(network).toBe('mainnet');
        expect(address).toBe('0x22843e74c59580b3eaf6c233fa67d8b7c561a835');
        await (0, network_1.updateSubgraphNetwork)(manifest, 'optimism', networksFie, 'address');
        subgraph = toolbox.filesystem.read(manifest);
        subgraphObj = yaml_1.default.parse(subgraph);
        network = subgraphObj.dataSources[0].network;
        address = subgraphObj.dataSources[0].source.address;
        expect(network).toBe('optimism');
        expect(address).toBe('0x12345...');
    });
});
