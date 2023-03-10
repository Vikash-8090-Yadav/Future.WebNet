import * as Interfaces from '../interfaces';
import { HelpFormatter, HelpSectionRenderer } from './formatter';
import { Command } from '../command';
export declare class CommandHelp extends HelpFormatter {
    command: Command.Class | Command.Loadable | Command.Cached;
    config: Interfaces.Config;
    opts: Interfaces.HelpOptions;
    constructor(command: Command.Class | Command.Loadable | Command.Cached, config: Interfaces.Config, opts: Interfaces.HelpOptions);
    generate(): string;
    protected groupFlags(flags: Array<Command.Flag.Any>): {
        mainFlags: Array<Command.Flag.Any>;
        flagGroups: {
            [name: string]: Array<Command.Flag.Any>;
        };
    };
    protected sections(): Array<{
        header: string;
        generate: HelpSectionRenderer;
    }>;
    protected usage(): string;
    protected defaultUsage(): string;
    protected description(): string | undefined;
    protected aliases(aliases: string[] | undefined): string | undefined;
    protected examples(examples: Command.Example[] | undefined | string): string | undefined;
    protected args(args: Command.Arg.Any[]): [string, string | undefined][] | undefined;
    protected arg(arg: Command.Arg.Any): string;
    protected flagHelpLabel(flag: Command.Flag.Any, showOptions?: boolean): string;
    protected flags(flags: Array<Command.Flag.Any>): [string, string | undefined][] | undefined;
    protected flagsDescriptions(flags: Array<Command.Flag.Any>): string | undefined;
}
export default CommandHelp;
