"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.valueFromAsc = exports.valueToAsc = exports.valueTypeForAsc = exports.ascTypeForValue = exports.ethereumFromAsc = exports.ethereumToAsc = exports.ethereumTypeForAsc = exports.ascTypeForEthereum = exports.ascTypeForProtocol = void 0;
const immutable_1 = __importDefault(require("immutable"));
const conversions_1 = __importDefault(require("./conversions"));
// Conversion utilities
const conversionsForTypeSystems = (fromTypeSystem, toTypeSystem) => {
    const conversions = conversions_1.default.getIn([fromTypeSystem, toTypeSystem]);
    if (conversions === undefined) {
        throw new Error(`Conversions from '${fromTypeSystem}' to '${toTypeSystem}' are not supported`);
    }
    return conversions;
};
const objectifyConversion = (fromTypeSystem, toTypeSystem, conversion) => {
    return immutable_1.default.fromJS({
        from: {
            typeSystem: fromTypeSystem,
            type: conversion.get(0),
        },
        to: {
            typeSystem: toTypeSystem,
            type: conversion.get(1),
        },
        convert: conversion.get(2),
    });
};
const findConversionFromType = (fromTypeSystem, toTypeSystem, fromType) => {
    const conversions = conversionsForTypeSystems(fromTypeSystem, toTypeSystem);
    const conversion = conversions.find(conversion => typeof conversion.get(0) === 'string'
        ? conversion.get(0) === fromType
        : !!fromType.match(conversion.get(0)));
    if (conversion === undefined) {
        throw new Error(`Conversion from '${fromTypeSystem}' to '${toTypeSystem}' for ` +
            `source type '${fromType}' is not supported`);
    }
    return objectifyConversion(fromTypeSystem, toTypeSystem, conversion);
};
const findConversionToType = (fromTypeSystem, toTypeSystem, toType) => {
    const conversions = conversionsForTypeSystems(fromTypeSystem, toTypeSystem);
    const conversion = conversions.find(conversion => typeof conversion.get(1) === 'string'
        ? conversion.get(1) === toType
        : !!toType.match(conversion.get(1)));
    if (conversion === undefined) {
        throw new Error(`Conversion from '${fromTypeSystem}' to '${toTypeSystem}' for ` +
            `target type '${toType}' is not supported`);
    }
    return objectifyConversion(fromTypeSystem, toTypeSystem, conversion);
};
// High-level type system API
const ascTypeForProtocol = (protocol, protocolType) => findConversionFromType(protocol, 'AssemblyScript', protocolType).getIn(['to', 'type']);
exports.ascTypeForProtocol = ascTypeForProtocol;
// TODO: this can be removed/replaced by the function above
const ascTypeForEthereum = (ethereumType) => (0, exports.ascTypeForProtocol)('ethereum', ethereumType);
exports.ascTypeForEthereum = ascTypeForEthereum;
const ethereumTypeForAsc = (ascType) => findConversionFromType('AssemblyScript', 'ethereum', ascType).getIn(['to', 'type']);
exports.ethereumTypeForAsc = ethereumTypeForAsc;
const ethereumToAsc = (code, ethereumType, internalType) => findConversionFromType('ethereum', 'AssemblyScript', ethereumType).get('convert')(code, internalType);
exports.ethereumToAsc = ethereumToAsc;
const ethereumFromAsc = (code, ethereumType) => findConversionToType('AssemblyScript', 'ethereum', ethereumType).get('convert')(code);
exports.ethereumFromAsc = ethereumFromAsc;
const ascTypeForValue = (valueType) => findConversionFromType('Value', 'AssemblyScript', valueType).getIn(['to', 'type']);
exports.ascTypeForValue = ascTypeForValue;
const valueTypeForAsc = (ascType) => findConversionFromType('AssemblyScript', 'Value', ascType).getIn(['to', 'type']);
exports.valueTypeForAsc = valueTypeForAsc;
const valueToAsc = (code, valueType) => findConversionFromType('Value', 'AssemblyScript', valueType).get('convert')(code);
exports.valueToAsc = valueToAsc;
const valueFromAsc = (code, valueType) => findConversionToType('AssemblyScript', 'Value', valueType).get('convert')(code);
exports.valueFromAsc = valueFromAsc;
