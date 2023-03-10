"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateContractValues = exports.validateContract = void 0;
const immutable_1 = __importDefault(require("immutable"));
const validateContract = (value, ProtocolContract) => {
    const contract = new ProtocolContract(value);
    const { valid, error } = contract.validate();
    if (!valid) {
        return {
            valid,
            error: `Contract ${ProtocolContract.identifierName()} is invalid: ${value}\n${error}`,
        };
    }
    return { valid, error };
};
exports.validateContract = validateContract;
const validateContractValues = (manifest, protocol) => {
    const ProtocolContract = protocol.getContract();
    const fieldName = ProtocolContract.identifierName();
    return manifest
        .get('dataSources')
        .filter((dataSource) => protocol.isValidKindName(dataSource.get('kind')))
        .reduce((errors, dataSource, dataSourceIndex) => {
        const path = ['dataSources', dataSourceIndex, 'source', fieldName];
        // No need to validate if the source has no contract field
        if (!dataSource.get('source').has(fieldName)) {
            return errors;
        }
        const contractValue = dataSource.getIn(['source', fieldName]);
        const { valid, error } = (0, exports.validateContract)(contractValue, ProtocolContract);
        // Validate whether the contract is valid for the protocol
        if (valid) {
            return errors;
        }
        return errors.push(immutable_1.default.fromJS({
            path,
            message: error,
        }));
    }, immutable_1.default.List());
};
exports.validateContractValues = validateContractValues;
