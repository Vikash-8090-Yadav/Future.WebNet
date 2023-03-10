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
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyMigrations = void 0;
const spinner_1 = require("./command-helpers/spinner");
const MIGRATIONS = [
    Promise.resolve().then(() => __importStar(require('./migrations/mapping_api_version_0_0_1'))),
    Promise.resolve().then(() => __importStar(require('./migrations/mapping_api_version_0_0_2'))),
    Promise.resolve().then(() => __importStar(require('./migrations/mapping_api_version_0_0_3'))),
    Promise.resolve().then(() => __importStar(require('./migrations/mapping_api_version_0_0_4'))),
    Promise.resolve().then(() => __importStar(require('./migrations/mapping_api_version_0_0_5'))),
    Promise.resolve().then(() => __importStar(require('./migrations/spec_version_0_0_2'))),
    Promise.resolve().then(() => __importStar(require('./migrations/spec_version_0_0_3'))),
];
const applyMigrations = async (options) => await (0, spinner_1.withSpinner)(`Apply migrations`, `Failed to apply migrations`, `Warnings while applying migraitons`, async (spinner) => {
    await MIGRATIONS.reduce(async (previousPromise, migrationImport) => {
        await previousPromise;
        const { default: migration } = await migrationImport;
        const skipHint = await migration.predicate(options);
        if (typeof skipHint !== 'string' && skipHint) {
            (0, spinner_1.step)(spinner, 'Apply migration:', migration.name);
            await migration.apply(options);
        }
        else if (typeof skipHint === 'string') {
            (0, spinner_1.step)(spinner, 'Skip migration:', `${migration.name} (${skipHint})`);
        }
        else {
            (0, spinner_1.step)(spinner, 'Skip migration:', String(migration.name));
        }
    }, Promise.resolve());
});
exports.applyMigrations = applyMigrations;
