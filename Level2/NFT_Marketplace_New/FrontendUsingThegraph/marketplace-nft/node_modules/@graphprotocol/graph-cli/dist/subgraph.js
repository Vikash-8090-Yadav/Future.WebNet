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
const graphql = __importStar(require("graphql/language"));
const immutable_1 = __importDefault(require("immutable"));
const yaml_1 = __importDefault(require("yaml"));
const types_1 = require("yaml/types");
const debug_1 = __importDefault(require("./debug"));
const validation = __importStar(require("./validation"));
const subgraphDebug = (0, debug_1.default)('graph-cli:subgraph');
const throwCombinedError = (filename, errors) => {
    throw new Error(errors.reduce((msg, e) => `${msg}

  Path: ${e.get('path').size === 0 ? '/' : e.get('path').join(' > ')}
  ${e.get('message').split('\n').join('\n  ')}`, `Error in ${path_1.default.relative(process.cwd(), filename)}:`));
};
const buildCombinedWarning = (filename, warnings) => warnings.size > 0
    ? warnings.reduce((msg, w) => `${msg}

    Path: ${w.get('path').size === 0 ? '/' : w.get('path').join(' > ')}
    ${w.get('message').split('\n').join('\n    ')}`, `Warnings in ${path_1.default.relative(process.cwd(), filename)}:`) + '\n'
    : null;
class Subgraph {
    static async validate(data, protocol, { resolveFile }) {
        subgraphDebug(`Validating Subgraph with protocol "%s"`, protocol);
        if (protocol.name == null) {
            return immutable_1.default.fromJS([
                {
                    path: [],
                    message: `Unable to determine for which protocol manifest file is built for. Ensure you have at least one 'dataSources' and/or 'templates' elements defined in your subgraph.`,
                },
            ]);
        }
        // Parse the default subgraph schema
        const schema = graphql.parse(await fs_extra_1.default.readFile(path_1.default.join(__dirname, 'protocols', protocol.name, `manifest.graphql`), 'utf-8'));
        // Obtain the root `SubgraphManifest` type from the schema
        const rootType = schema.definitions.find(definition => {
            // @ts-expect-error TODO: name field does not exist on definition, really?
            return definition.name.value === 'SubgraphManifest';
        });
        // Validate the subgraph manifest using this schema
        return validation.validateManifest(data, rootType, schema, protocol, { resolveFile });
    }
    static validateSchema(manifest, { resolveFile }) {
        const filename = resolveFile(manifest.getIn(['schema', 'file']));
        const validationErrors = validation.validateSchema(filename);
        let errors;
        if (validationErrors.size > 0) {
            errors = validationErrors.groupBy(error => error.get('entity')).sort();
            const msg = errors.reduce((msg, errors, entity) => {
                errors = errors.groupBy((error) => error.get('directive'));
                const inner_msgs = errors.reduce((msg, errors, directive) => {
                    return `${msg}${directive
                        ? `
    ${directive}:`
                        : ''}
  ${errors
                        .map(error => error.get('message').split('\n').join('\n  '))
                        .map(msg => `${directive ? '  ' : ''}- ${msg}`)
                        .join('\n  ')}`;
                }, ``);
                return `${msg}

  ${entity}:${inner_msgs}`;
            }, `Error in ${path_1.default.relative(process.cwd(), filename)}:`);
            throw new Error(msg);
        }
    }
    static validateRepository(manifest) {
        const repository = manifest.get('repository');
        return /^https:\/\/github\.com\/graphprotocol\/example-subgraphs?$/.test(repository)
            ? immutable_1.default.List().push(immutable_1.default.fromJS({
                path: ['repository'],
                message: `\
The repository is still set to ${repository}.
Please replace it with a link to your subgraph source code.`,
            }))
            : immutable_1.default.List();
    }
    static validateDescription(manifest) {
        // TODO: Maybe implement this in the future for each protocol example description
        return manifest.get('description', '').startsWith('Gravatar for ')
            ? immutable_1.default.List().push(immutable_1.default.fromJS({
                path: ['description'],
                message: `\
The description is still the one from the example subgraph.
Please update it to tell users more about your subgraph.`,
            }))
            : immutable_1.default.List();
    }
    static validateHandlers(manifest, protocol, protocolSubgraph) {
        return manifest
            .get('dataSources')
            .filter((dataSource) => protocol.isValidKindName(dataSource.get('kind')))
            .reduce((errors, dataSource, dataSourceIndex) => {
            const path = ['dataSources', dataSourceIndex, 'mapping'];
            const mapping = dataSource.get('mapping');
            const handlerTypes = protocolSubgraph.handlerTypes();
            subgraphDebug('Validating dataSource "%s" handlers with %d handlers types defined for protocol', dataSource.get('name'), handlerTypes.size);
            if (handlerTypes.size == 0) {
                return errors;
            }
            const areAllHandlersEmpty = handlerTypes
                .map((handlerType) => mapping.get(handlerType, immutable_1.default.List()))
                .every((handlers) => handlers.isEmpty());
            const handlerNamesWithoutLast = handlerTypes.pop().join(', ');
            return areAllHandlersEmpty
                ? errors.push(immutable_1.default.fromJS({
                    path,
                    message: `\
Mapping has no ${handlerNamesWithoutLast} or ${handlerTypes.get(-1)}.
At least one such handler must be defined.`,
                }))
                : errors;
        }, immutable_1.default.List());
    }
    static validateContractValues(manifest, protocol) {
        if (!protocol.hasContract()) {
            return immutable_1.default.List();
        }
        return validation.validateContractValues(manifest, protocol);
    }
    // Validate that data source names are unique, so they don't overwrite each other.
    static validateUniqueDataSourceNames(manifest) {
        const names = [];
        return manifest
            .get('dataSources')
            .reduce((errors, dataSource, dataSourceIndex) => {
            const path = ['dataSources', dataSourceIndex, 'name'];
            const name = dataSource.get('name');
            if (names.includes(name)) {
                errors = errors.push(immutable_1.default.fromJS({
                    path,
                    message: `\
More than one data source named '${name}', data source names must be unique.`,
                }));
            }
            names.push(name);
            return errors;
        }, immutable_1.default.List());
    }
    static validateUniqueTemplateNames(manifest) {
        const names = [];
        return manifest
            .get('templates', immutable_1.default.List())
            .reduce((errors, template, templateIndex) => {
            const path = ['templates', templateIndex, 'name'];
            const name = template.get('name');
            if (names.includes(name)) {
                errors = errors.push(immutable_1.default.fromJS({
                    path,
                    message: `\
More than one template named '${name}', template names must be unique.`,
                }));
            }
            names.push(name);
            return errors;
        }, immutable_1.default.List());
    }
    static dump(manifest) {
        types_1.strOptions.fold.lineWidth = 90;
        // @ts-expect-error TODO: plain is the value behind the TS constant
        types_1.strOptions.defaultType = 'PLAIN';
        return yaml_1.default.stringify(manifest.toJS());
    }
    static async load(filename, { protocol, skipValidation } = {
        skipValidation: false,
    }) {
        // Load and validate the manifest
        let data = null;
        let has_file_data_sources = false;
        if (filename.match(/.js$/)) {
            data = require(path_1.default.resolve(filename));
        }
        else {
            const raw_data = await fs_extra_1.default.readFile(filename, 'utf-8');
            has_file_data_sources = raw_data.includes('kind: file');
            data = yaml_1.default.parse(raw_data);
        }
        // Helper to resolve files relative to the subgraph manifest
        const resolveFile = maybeRelativeFile => path_1.default.resolve(path_1.default.dirname(filename), maybeRelativeFile);
        // TODO: Validation for file data sources
        if (!has_file_data_sources) {
            const manifestErrors = await Subgraph.validate(data, protocol, { resolveFile });
            if (manifestErrors.size > 0) {
                throwCombinedError(filename, manifestErrors);
            }
        }
        const manifest = immutable_1.default.fromJS(data);
        // Validate the schema
        Subgraph.validateSchema(manifest, { resolveFile });
        // Perform other validations
        const protocolSubgraph = protocol.getSubgraph({
            manifest,
            resolveFile,
        });
        const errors = skipValidation
            ? immutable_1.default.List()
            : immutable_1.default.List.of(...protocolSubgraph.validateManifest(), ...Subgraph.validateContractValues(manifest, protocol), ...Subgraph.validateUniqueDataSourceNames(manifest), ...Subgraph.validateUniqueTemplateNames(manifest), ...Subgraph.validateHandlers(manifest, protocol, protocolSubgraph));
        if (errors.size > 0) {
            throwCombinedError(filename, errors);
        }
        // Perform warning validations
        const warnings = skipValidation
            ? immutable_1.default.List()
            : immutable_1.default.List.of(...Subgraph.validateRepository(manifest), ...Subgraph.validateDescription(manifest));
        return {
            result: manifest,
            warning: warnings.size > 0 ? buildCombinedWarning(filename, warnings) : null,
        };
    }
    static async write(manifest, filename) {
        await fs_extra_1.default.writeFile(filename, Subgraph.dump(manifest));
    }
}
exports.default = Subgraph;
