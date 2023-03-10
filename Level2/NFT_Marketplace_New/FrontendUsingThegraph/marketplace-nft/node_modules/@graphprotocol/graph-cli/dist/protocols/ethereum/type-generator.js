"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const immutable_1 = __importDefault(require("immutable"));
const prettier_1 = __importDefault(require("prettier"));
const typescript_1 = require("../../codegen/typescript");
const fs_1 = require("../../command-helpers/fs");
const spinner_1 = require("../../command-helpers/spinner");
const abi_1 = __importDefault(require("./abi"));
class EthereumTypeGenerator {
    constructor(options) {
        this.sourceDir = options.sourceDir;
        this.outputDir = options.outputDir;
    }
    async loadABIs(subgraph) {
        return await (0, spinner_1.withSpinner)('Load contract ABIs', 'Failed to load contract ABIs', `Warnings while loading contract ABIs`, async (spinner) => {
            try {
                return subgraph
                    .get('dataSources')
                    .reduce((abis, dataSource) => dataSource
                    .getIn(['mapping', 'abis'])
                    .reduce((abis, abi) => abis.push(this._loadABI(dataSource, abi.get('name'), abi.get('file'), spinner)), abis), immutable_1.default.List());
            }
            catch (e) {
                throw Error(`Failed to load contract ABIs: ${e.message}`);
            }
        });
    }
    _loadABI(dataSource, name, maybeRelativePath, spinner) {
        try {
            if (this.sourceDir) {
                const absolutePath = path_1.default.resolve(this.sourceDir, maybeRelativePath);
                (0, spinner_1.step)(spinner, `Load contract ABI from`, (0, fs_1.displayPath)(absolutePath));
                return { dataSource, abi: abi_1.default.load(name, absolutePath) };
            }
            return { dataSource, abi: abi_1.default.load(name, maybeRelativePath) };
        }
        catch (e) {
            throw Error(`Failed to load contract ABI: ${e.message}`);
        }
    }
    async loadDataSourceTemplateABIs(subgraph) {
        return await (0, spinner_1.withSpinner)(`Load data source template ABIs`, `Failed to load data source template ABIs`, `Warnings while loading data source template ABIs`, async (spinner) => {
            const abis = [];
            for (const template of subgraph.get('templates', immutable_1.default.List())) {
                for (const abi of template.getIn(['mapping', 'abis'])) {
                    abis.push(this._loadDataSourceTemplateABI(template, abi.get('name'), abi.get('file'), spinner));
                }
            }
            return abis;
        });
    }
    _loadDataSourceTemplateABI(template, name, maybeRelativePath, spinner) {
        try {
            if (this.sourceDir) {
                const absolutePath = path_1.default.resolve(this.sourceDir, maybeRelativePath);
                (0, spinner_1.step)(spinner, `Load data source template ABI from`, (0, fs_1.displayPath)(absolutePath));
                return { template, abi: abi_1.default.load(name, absolutePath) };
            }
            return { template, abi: abi_1.default.load(name, maybeRelativePath) };
        }
        catch (e) {
            throw Error(`Failed to load data source template ABI: ${e.message}`);
        }
    }
    generateTypesForABIs(abis) {
        return (0, spinner_1.withSpinner)(`Generate types for contract ABIs`, `Failed to generate types for contract ABIs`, `Warnings while generating types for contract ABIs`, async (spinner) => {
            return await Promise.all(abis.map(async (abi) => await this._generateTypesForABI(abi, spinner)));
        });
    }
    async _generateTypesForABI(abi, spinner) {
        try {
            (0, spinner_1.step)(spinner, `Generate types for contract ABI:`, `${abi.abi.name} (${(0, fs_1.displayPath)(abi.abi.file)})`);
            const codeGenerator = abi.abi.codeGenerator();
            const code = prettier_1.default.format([
                typescript_1.GENERATED_FILE_NOTE,
                ...codeGenerator.generateModuleImports(),
                ...codeGenerator.generateTypes(),
            ].join('\n'), {
                parser: 'typescript',
            });
            const outputFile = path_1.default.join(this.outputDir, abi.dataSource.get('name'), `${abi.abi.name}.ts`);
            (0, spinner_1.step)(spinner, `Write types to`, (0, fs_1.displayPath)(outputFile));
            await fs_extra_1.default.mkdirs(path_1.default.dirname(outputFile));
            await fs_extra_1.default.writeFile(outputFile, code);
        }
        catch (e) {
            throw Error(`Failed to generate types for contract ABI: ${e.message}`);
        }
    }
    async generateTypesForDataSourceTemplateABIs(abis) {
        return await (0, spinner_1.withSpinner)(`Generate types for data source template ABIs`, `Failed to generate types for data source template ABIs`, `Warnings while generating types for data source template ABIs`, async (spinner) => {
            return await Promise.all(abis.map(async (abi) => await this._generateTypesForDataSourceTemplateABI(abi, spinner)));
        });
    }
    async _generateTypesForDataSourceTemplateABI(abi, spinner) {
        try {
            (0, spinner_1.step)(spinner, `Generate types for data source template ABI:`, `${abi.template.get('name')} > ${abi.abi.name} (${(0, fs_1.displayPath)(abi.abi.file)})`);
            const codeGenerator = abi.abi.codeGenerator();
            const code = prettier_1.default.format([
                typescript_1.GENERATED_FILE_NOTE,
                ...codeGenerator.generateModuleImports(),
                ...codeGenerator.generateTypes(),
            ].join('\n'), {
                parser: 'typescript',
            });
            const outputFile = path_1.default.join(this.outputDir, 'templates', abi.template.get('name'), `${abi.abi.name}.ts`);
            (0, spinner_1.step)(spinner, `Write types to`, (0, fs_1.displayPath)(outputFile));
            await fs_extra_1.default.mkdirs(path_1.default.dirname(outputFile));
            await fs_extra_1.default.writeFile(outputFile, code);
        }
        catch (e) {
            throw Error(`Failed to generate types for data source template ABI: ${e.message}`);
        }
    }
}
exports.default = EthereumTypeGenerator;
