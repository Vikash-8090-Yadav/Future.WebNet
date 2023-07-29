"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = void 0;
const Converters_1 = require("../check/arbitrary/definition/Converters");
const CommandsArbitrary_1 = require("./_internals/CommandsArbitrary");
const MaxLengthFromMinLength_1 = require("./_internals/helpers/MaxLengthFromMinLength");
function commands(commandArbs, constraints) {
    const config = constraints == null ? {} : typeof constraints === 'number' ? { maxCommands: constraints } : constraints;
    const size = config.size;
    const maxCommands = config.maxCommands !== undefined ? config.maxCommands : MaxLengthFromMinLength_1.MaxLengthUpperBound;
    const specifiedMaxCommands = config.maxCommands !== undefined;
    const maxGeneratedCommands = (0, MaxLengthFromMinLength_1.maxGeneratedLengthFromSizeForArbitrary)(size, 0, maxCommands, specifiedMaxCommands);
    return (0, Converters_1.convertFromNext)(new CommandsArbitrary_1.CommandsArbitrary(commandArbs, maxGeneratedCommands, maxCommands, config.replayPath != null ? config.replayPath : null, !!config.disableReplayLog));
}
exports.commands = commands;
