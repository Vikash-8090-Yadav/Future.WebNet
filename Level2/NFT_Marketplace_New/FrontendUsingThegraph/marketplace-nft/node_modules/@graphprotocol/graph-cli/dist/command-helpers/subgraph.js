"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubgraphBasename = exports.validateSubgraphName = void 0;
const validateSubgraphName = (name, { allowSimpleName }) => {
    if (allowSimpleName) {
        return name;
    }
    if (name.split('/').length !== 2) {
        throw new Error(`Subgraph name "${name}" needs to have the format "<PREFIX>/${name}".

When using the Hosted Service at https://thegraph.com, <PREFIX> is the
name of your GitHub user or organization.

You can bypass this check with --allow-simple-name.`);
    }
};
exports.validateSubgraphName = validateSubgraphName;
const getSubgraphBasename = (name) => {
    const segments = name.split('/', 2);
    return segments[segments.length - 1];
};
exports.getSubgraphBasename = getSubgraphBasename;
