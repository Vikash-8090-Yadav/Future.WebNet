import { GluegunToolbox } from '../index';
import * as CLITable from 'cli-table3';
import * as importedColors from 'colors';
import ora = require('ora');
import { Toolbox } from '../domain/toolbox';
export declare type GluegunPrintColors = typeof importedColors & {
    highlight: (t: string) => string;
    info: (t: string) => string;
    warning: (t: string) => string;
    success: (t: string) => string;
    error: (t: string) => string;
    line: (t: string) => string;
    muted: (t: string) => string;
};
export interface GluegunPrint {
    colors: GluegunPrintColors;
    checkmark: string;
    xmark: string;
    info: (message: any) => void;
    warning: (message: any) => void;
    success: (message: any) => void;
    error: (message: any) => void;
    debug: (value: any, title?: string) => void;
    fancy: (value: string) => void;
    divider: () => void;
    findWidths: (cliTable: CLITable) => number[];
    columnHeaderDivider: (cliTable: CLITable) => string[];
    newline: () => void;
    table: (data: any, options?: any) => void;
    spin(options?: ora.Options | string): ora.Ora;
    printCommands(toolbox: Toolbox, commandRoot?: string[]): void;
    printHelp(toolbox: GluegunToolbox): void;
}
