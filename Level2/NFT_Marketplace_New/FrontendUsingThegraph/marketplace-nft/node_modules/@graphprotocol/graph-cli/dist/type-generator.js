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
// @ts-expect-error TODO: type out if necessary
const Index_bs_js_1 = __importDefault(require("@float-capital/float-subgraph-uncrashable/src/Index.bs.js"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const toolbox = __importStar(require("gluegun"));
const graphql = __importStar(require("graphql/language"));
const immutable_1 = __importDefault(require("immutable"));
const prettier_1 = __importDefault(require("prettier"));
const template_1 = __importDefault(require("./codegen/template"));
const typescript_1 = require("./codegen/typescript");
const fs_1 = require("./command-helpers/fs");
const spinner_1 = require("./command-helpers/spinner");
const migrations_1 = require("./migrations");
const schema_1 = __importDefault(require("./schema"));
const subgraph_1 = __importDefault(require("./subgraph"));
const watcher_1 = __importDefault(require("./watcher"));
class TypeGenerator {
    constructor(options) {
        this.options = options;
        this.sourceDir =
            this.options.sourceDir ||
                (this.options.subgraphManifest && path_1.default.dirname(this.options.subgraphManifest));
        this.protocol = this.options.protocol;
        this.protocolTypeGenerator = this.protocol?.getTypeGenerator?.({
            sourceDir: this.sourceDir,
            outputDir: this.options.outputDir,
        });
        process.on('uncaughtException', e => {
            toolbox.print.error(`UNCAUGHT EXCEPTION: ${e}`);
        });
    }
    async generateTypes() {
        try {
            if (!this.options.skipMigrations && this.options.subgraphManifest) {
                await (0, migrations_1.applyMigrations)({
                    sourceDir: this.sourceDir,
                    manifestFile: this.options.subgraphManifest,
                });
            }
            const subgraph = await this.loadSubgraph();
            // Not all protocols support/have ABIs.
            if (this.protocol.hasABIs()) {
                const abis = await this.protocolTypeGenerator.loadABIs(subgraph);
                await this.protocolTypeGenerator.generateTypesForABIs(abis);
            }
            await this.generateTypesForDataSourceTemplates(subgraph);
            // Not all protocols support/have ABIs.
            if (this.protocol.hasABIs()) {
                const templateAbis = await this.protocolTypeGenerator.loadDataSourceTemplateABIs(subgraph);
                await this.protocolTypeGenerator.generateTypesForDataSourceTemplateABIs(templateAbis);
            }
            const schema = await this.loadSchema(subgraph);
            await this.generateTypesForSchema(schema);
            toolbox.print.success('\nTypes generated successfully\n');
            if (this.options.uncrashable && this.options.uncrashableConfig) {
                await this.generateUncrashableEntities(schema);
                toolbox.print.success('\nUncrashable Helpers generated successfully\n');
            }
            return true;
        }
        catch (e) {
            return false;
        }
    }
    async generateUncrashableEntities(graphSchema) {
        const ast = graphql.parse(graphSchema.document);
        const entityDefinitions = ast['definitions'];
        return await (0, spinner_1.withSpinner)(`Generate Uncrashable Entity Helpers`, `Failed to generate Uncrashable Entity Helpers`, `Warnings while generating Uncrashable Entity Helpers`, async (spinner) => {
            Index_bs_js_1.default.run(entityDefinitions, this.options.uncrashableConfig, this.options.outputDir);
            const outputFile = path_1.default.join(this.options.outputDir, 'UncrashableEntityHelpers.ts');
            (0, spinner_1.step)(spinner, 'Save uncrashable entities to', (0, fs_1.displayPath)(outputFile));
        });
    }
    async loadSubgraph({ quiet } = { quiet: false }) {
        const subgraphLoadOptions = { protocol: this.protocol, skipValidation: false };
        if (quiet) {
            return this.options.subgraph
                ? this.options.subgraph
                : (await subgraph_1.default.load(this.options.subgraphManifest, subgraphLoadOptions)).result;
        }
        const manifestPath = (0, fs_1.displayPath)(this.options.subgraphManifest);
        return await (0, spinner_1.withSpinner)(`Load subgraph from ${manifestPath}`, `Failed to load subgraph from ${manifestPath}`, `Warnings while loading subgraph from ${manifestPath}`, async (_spinner) => {
            return this.options.subgraph
                ? this.options.subgraph
                : subgraph_1.default.load(this.options.subgraphManifest, subgraphLoadOptions);
        });
    }
    async loadSchema(subgraph) {
        const maybeRelativePath = subgraph.getIn(['schema', 'file']);
        const absolutePath = path_1.default.resolve(this.sourceDir, maybeRelativePath);
        return await (0, spinner_1.withSpinner)(`Load GraphQL schema from ${(0, fs_1.displayPath)(absolutePath)}`, `Failed to load GraphQL schema from ${(0, fs_1.displayPath)(absolutePath)}`, `Warnings while loading GraphQL schema from ${(0, fs_1.displayPath)(absolutePath)}`, async (_spinner) => {
            const absolutePath = path_1.default.resolve(this.sourceDir, maybeRelativePath);
            return schema_1.default.load(absolutePath);
        });
    }
    async generateTypesForSchema(schema) {
        return await (0, spinner_1.withSpinner)(`Generate types for GraphQL schema`, `Failed to generate types for GraphQL schema`, `Warnings while generating types for GraphQL schema`, async (spinner) => {
            // Generate TypeScript module from schema
            const codeGenerator = schema.codeGenerator();
            const code = prettier_1.default.format([
                typescript_1.GENERATED_FILE_NOTE,
                ...codeGenerator.generateModuleImports(),
                ...codeGenerator.generateTypes(),
            ].join('\n'), {
                parser: 'typescript',
            });
            const outputFile = path_1.default.join(this.options.outputDir, 'schema.ts');
            (0, spinner_1.step)(spinner, 'Write types to', (0, fs_1.displayPath)(outputFile));
            await fs_extra_1.default.mkdirs(path_1.default.dirname(outputFile));
            await fs_extra_1.default.writeFile(outputFile, code);
        });
    }
    async generateTypesForDataSourceTemplates(subgraph) {
        return await (0, spinner_1.withSpinner)(`Generate types for data source templates`, `Failed to generate types for data source templates`, `Warnings while generating types for data source templates`, async (spinner) => {
            // Combine the generated code for all templates
            const codeSegments = subgraph
                .get('templates', immutable_1.default.List())
                .reduce((codeSegments, template) => {
                (0, spinner_1.step)(spinner, 'Generate types for data source template', String(template.get('name')));
                const codeGenerator = new template_1.default(template, this.protocol);
                // Only generate module imports once, because they are identical for
                // all types generated for data source templates.
                if (codeSegments.isEmpty()) {
                    codeSegments = codeSegments.concat(codeGenerator.generateModuleImports());
                }
                return codeSegments.concat(codeGenerator.generateTypes());
            }, immutable_1.default.List());
            if (!codeSegments.isEmpty()) {
                const code = prettier_1.default.format([typescript_1.GENERATED_FILE_NOTE, ...codeSegments].join('\n'), {
                    parser: 'typescript',
                });
                const outputFile = path_1.default.join(this.options.outputDir, 'templates.ts');
                (0, spinner_1.step)(spinner, `Write types for templates to`, (0, fs_1.displayPath)(outputFile));
                await fs_extra_1.default.mkdirs(path_1.default.dirname(outputFile));
                await fs_extra_1.default.writeFile(outputFile, code);
            }
        });
    }
    async getFilesToWatch() {
        try {
            const files = [];
            const subgraph = await this.loadSubgraph({ quiet: true });
            // Add the subgraph manifest file
            files.push(this.options.subgraphManifest);
            // Add the GraphQL schema to the watched files
            files.push(subgraph.getIn(['schema', 'file']));
            // Add all file paths specified in manifest
            subgraph.get('dataSources').map((dataSource) => {
                dataSource.getIn(['mapping', 'abis']).map((abi) => {
                    files.push(abi.get('file'));
                });
            });
            // Make paths absolute
            return files.map(file => path_1.default.resolve(file));
        }
        catch (e) {
            throw Error(`Failed to load subgraph: ${e.message}`);
        }
    }
    async watchAndGenerateTypes() {
        const generator = this;
        let spinner;
        // Create watcher and generate types once and then on every change to a watched file
        const watcher = new watcher_1.default({
            onReady: () => (spinner = toolbox.print.spin('Watching subgraph files')),
            onTrigger: async (changedFile) => {
                if (changedFile !== undefined) {
                    spinner.info(`File change detected: ${(0, fs_1.displayPath)(changedFile)}\n`);
                }
                await generator.generateTypes();
                spinner.start();
            },
            onCollectFiles: async () => await generator.getFilesToWatch(),
            onError: error => {
                spinner.stop();
                toolbox.print.error(`${error}\n`);
                spinner.start();
            },
        });
        // Catch keyboard interrupt: close watcher and exit process
        process.on('SIGINT', () => {
            watcher.close();
            process.exit();
        });
        try {
            await watcher.watch();
        }
        catch (e) {
            toolbox.print.error(String(e.message));
        }
    }
}
exports.default = TypeGenerator;
