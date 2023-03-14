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
const immutable_1 = __importDefault(require("immutable"));
const DataSourcesExtractor = __importStar(require("../../command-helpers/data-sources"));
const abi_1 = __importDefault(require("./abi"));
class EthereumSubgraph {
    constructor(options) {
        this.manifest = options.manifest;
        this.resolveFile = options.resolveFile;
        this.protocol = options.protocol;
    }
    validateManifest() {
        return this.validateAbis().concat(this.validateEvents()).concat(this.validateCallFunctions());
    }
    validateAbis() {
        const dataSourcesAndTemplates = DataSourcesExtractor.fromManifest(this.manifest, this.protocol);
        return dataSourcesAndTemplates.reduce((errors, dataSourceOrTemplate) => errors.concat(this.validateDataSourceAbis(dataSourceOrTemplate.get('dataSource'), dataSourceOrTemplate.get('path'))), immutable_1.default.List());
    }
    validateDataSourceAbis(dataSource, path) {
        // Validate that the the "source > abi" reference of all data sources
        // points to an existing ABI in the data source ABIs
        const abiName = dataSource.getIn(['source', 'abi']);
        const abiNames = dataSource.getIn(['mapping', 'abis']).map((abi) => abi.get('name'));
        const nameErrors = abiNames.includes(abiName)
            ? immutable_1.default.List()
            : immutable_1.default.fromJS([
                {
                    path: [...path, 'source', 'abi'],
                    message: `\
ABI name '${abiName}' not found in mapping > abis.
Available ABIs:
${abiNames
                        .sort()
                        .map((name) => `- ${name}`)
                        .join('\n')}`,
                },
            ]);
        // Validate that all ABI files are valid
        const fileErrors = dataSource
            .getIn(['mapping', 'abis'])
            .reduce((errors, abi, abiIndex) => {
            try {
                abi_1.default.load(abi.get('name'), this.resolveFile(abi.get('file')));
                return errors;
            }
            catch (e) {
                return errors.push(immutable_1.default.fromJS({
                    path: [...path, 'mapping', 'abis', abiIndex, 'file'],
                    message: e.message,
                }));
            }
        }, immutable_1.default.List());
        return nameErrors.concat(fileErrors);
    }
    validateEvents() {
        const dataSourcesAndTemplates = DataSourcesExtractor.fromManifest(this.manifest, this.protocol);
        return dataSourcesAndTemplates.reduce((errors, dataSourceOrTemplate) => {
            return errors.concat(this.validateDataSourceEvents(dataSourceOrTemplate.get('dataSource'), dataSourceOrTemplate.get('path')));
        }, immutable_1.default.List());
    }
    validateDataSourceEvents(dataSource, path) {
        let abi;
        try {
            // Resolve the source ABI name into a real ABI object
            const abiName = dataSource.getIn(['source', 'abi']);
            const abiEntry = dataSource
                .getIn(['mapping', 'abis'])
                .find((abi) => abi.get('name') === abiName);
            abi = abi_1.default.load(abiEntry.get('name'), this.resolveFile(abiEntry.get('file')));
        }
        catch (_) {
            // Ignore errors silently; we can't really say anything about
            // the events if the ABI can't even be loaded
            return immutable_1.default.List();
        }
        // Obtain event signatures from the mapping
        const manifestEvents = dataSource
            .getIn(['mapping', 'eventHandlers'], immutable_1.default.List())
            .map((handler) => handler.get('event'));
        // Obtain event signatures from the ABI
        const abiEvents = abi.eventSignatures();
        // Add errors for every manifest event signature that is not
        // present in the ABI
        return manifestEvents.reduce((errors, manifestEvent, index) => abiEvents.includes(manifestEvent)
            ? errors
            : errors.push(immutable_1.default.fromJS({
                path: [...path, 'eventHandlers', index],
                message: `\
Event with signature '${manifestEvent}' not present in ABI '${abi.name}'.
Available events:
${abiEvents
                    .sort()
                    .map(event => `- ${event}`)
                    .join('\n')}`,
            })), immutable_1.default.List());
    }
    validateCallFunctions() {
        return this.manifest
            .get('dataSources')
            .filter((dataSource) => this.protocol.isValidKindName(dataSource.get('kind')))
            .reduce((errors, dataSource, dataSourceIndex) => {
            const path = ['dataSources', dataSourceIndex, 'callHandlers'];
            let abi;
            try {
                // Resolve the source ABI name into a real ABI object
                const abiName = dataSource.getIn(['source', 'abi']);
                const abiEntry = dataSource
                    .getIn(['mapping', 'abis'])
                    .find((abi) => abi.get('name') === abiName);
                abi = abi_1.default.load(abiEntry.get('name'), this.resolveFile(abiEntry.get('file')));
            }
            catch (e) {
                // Ignore errors silently; we can't really say anything about
                // the call functions if the ABI can't even be loaded
                return errors;
            }
            // Obtain event signatures from the mapping
            const manifestFunctions = dataSource
                .getIn(['mapping', 'callHandlers'], immutable_1.default.List())
                .map((handler) => handler.get('function'));
            // Obtain event signatures from the ABI
            const abiFunctions = abi.callFunctionSignatures();
            // Add errors for every manifest event signature that is not
            // present in the ABI
            return manifestFunctions.reduce((errors, manifestFunction, index) => abiFunctions.includes(manifestFunction)
                ? errors
                : errors.push(immutable_1.default.fromJS({
                    path: [...path, index],
                    message: `\
Call function with signature '${manifestFunction}' not present in ABI '${abi.name}'.
Available call functions:
${abiFunctions
                        .sort()
                        .map(tx => `- ${tx}`)
                        .join('\n')}`,
                })), errors);
        }, immutable_1.default.List());
    }
    handlerTypes() {
        return immutable_1.default.List(['blockHandlers', 'callHandlers', 'eventHandlers']);
    }
}
exports.default = EthereumSubgraph;
