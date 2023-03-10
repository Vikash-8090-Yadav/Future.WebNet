"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chooseNodeUrl = exports.normalizeNodeUrl = exports.validateNodeUrl = void 0;
const url_1 = require("url");
const gluegun_1 = require("gluegun");
const SUBGRAPH_STUDIO_URL = 'https://api.studio.thegraph.com/deploy/';
const HOSTED_SERVICE_URL = 'https://api.thegraph.com/deploy/';
const validateNodeUrl = (node) => new url_1.URL(node);
exports.validateNodeUrl = validateNodeUrl;
const normalizeNodeUrl = (node) => new url_1.URL(node).toString();
exports.normalizeNodeUrl = normalizeNodeUrl;
function chooseNodeUrl({ product, studio, node, allowSimpleName, }) {
    if (node) {
        try {
            (0, exports.validateNodeUrl)(node);
        }
        catch (e) {
            gluegun_1.print.error(`Graph node "${node}" is invalid: ${e.message}`);
            process.exit(1);
        }
    }
    else {
        if (studio) {
            product = 'subgraph-studio';
        }
        switch (product) {
            case 'subgraph-studio':
                node = SUBGRAPH_STUDIO_URL;
                break;
            case 'hosted-service':
                node = HOSTED_SERVICE_URL;
                break;
        }
    }
    if (node?.match(/studio/) || product === 'subgraph-studio') {
        allowSimpleName = true;
    }
    return { node, allowSimpleName };
}
exports.chooseNodeUrl = chooseNodeUrl;
