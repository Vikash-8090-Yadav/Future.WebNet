import * as Interfaces from '../interfaces';
import CommandHelp from './command';
import { HelpFormatter } from './formatter';
import { Command } from '../command';
export { CommandHelp } from './command';
export { standardizeIDFromArgv, loadHelpClass, getHelpFlagAdditions, normalizeArgv } from './util';
export declare abstract class HelpBase extends HelpFormatter {
    constructor(config: Interfaces.Config, opts?: Partial<Interfaces.HelpOptions>);
    /**
     * Show help, used in multi-command CLIs
     * @param args passed into your command, useful for determining which type of help to display
     */
    abstract showHelp(argv: string[]): Promise<void>;
    /**
     * Show help for an individual command
     * @param command
     * @param topics
     */
    abstract showCommandHelp(command: Command.Class, topics: Interfaces.Topic[]): Promise<void>;
}
export declare class Help extends HelpBase {
    protected CommandHelpClass: typeof CommandHelp;
    private get _topics();
    protected get sortedCommands(): Command.Loadable[];
    protected get sortedTopics(): Interfaces.Topic[];
    constructor(config: Interfaces.Config, opts?: Partial<Interfaces.HelpOptions>);
    showHelp(argv: string[]): Promise<void>;
    showCommandHelp(command: Command.Class | Command.Loadable | Command.Cached): Promise<void>;
    protected showRootHelp(): Promise<void>;
    protected showTopicHelp(topic: Interfaces.Topic): Promise<void>;
    protected formatRoot(): string;
    protected formatCommand(command: Command.Class | Command.Loadable | Command.Cached): string;
    protected getCommandHelpClass(command: Command.Class | Command.Loadable | Command.Cached): CommandHelp;
    protected formatCommands(commands: Array<Command.Class | Command.Loadable | Command.Cached>): string;
    protected summary(c: Command.Class | Command.Loadable | Command.Cached): string | undefined;
    protected description(c: Command.Class | Command.Loadable | Command.Cached): string;
    protected formatTopic(topic: Interfaces.Topic): string;
    protected formatTopics(topics: Interfaces.Topic[]): string;
    protected command(command: Command.Class): string;
    protected log(...args: string[]): void;
}
