import { convertFromNext } from '../check/arbitrary/definition/Converters.js';
import { CommandsArbitrary } from './_internals/CommandsArbitrary.js';
import { maxGeneratedLengthFromSizeForArbitrary, MaxLengthUpperBound, } from './_internals/helpers/MaxLengthFromMinLength.js';
function commands(commandArbs, constraints) {
    const config = constraints == null ? {} : typeof constraints === 'number' ? { maxCommands: constraints } : constraints;
    const size = config.size;
    const maxCommands = config.maxCommands !== undefined ? config.maxCommands : MaxLengthUpperBound;
    const specifiedMaxCommands = config.maxCommands !== undefined;
    const maxGeneratedCommands = maxGeneratedLengthFromSizeForArbitrary(size, 0, maxCommands, specifiedMaxCommands);
    return convertFromNext(new CommandsArbitrary(commandArbs, maxGeneratedCommands, maxCommands, config.replayPath != null ? config.replayPath : null, !!config.disableReplayLog));
}
export { commands };
