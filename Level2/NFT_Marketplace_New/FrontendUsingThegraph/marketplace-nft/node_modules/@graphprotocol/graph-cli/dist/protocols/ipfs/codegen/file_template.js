"use strict";
/* eslint-disable */
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
const tsCodegen = __importStar(require("../../../codegen/typescript"));
class IpfsFileTemplateCodeGen {
    constructor(template) {
        this.template = template;
        this.template = template;
    }
    generateModuleImports() {
        return [];
    }
    generateCreateMethod() {
        const name = this.template.get('name');
        return tsCodegen.staticMethod('create', [tsCodegen.param('cid', tsCodegen.namedType('string'))], tsCodegen.namedType('void'), `
      DataSourceTemplate.create('${name}', [cid])
      `);
    }
    generateCreateWithContextMethod() {
        const name = this.template.get('name');
        return tsCodegen.staticMethod('createWithContext', [
            tsCodegen.param('cid', tsCodegen.namedType('string')),
            tsCodegen.param('context', tsCodegen.namedType('DataSourceContext')),
        ], tsCodegen.namedType('void'), `
      DataSourceTemplate.createWithContext('${name}', [cid], context)
      `);
    }
}
exports.default = IpfsFileTemplateCodeGen;
