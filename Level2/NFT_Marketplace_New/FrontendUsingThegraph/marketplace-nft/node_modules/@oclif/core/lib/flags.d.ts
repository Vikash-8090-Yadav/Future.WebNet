/// <reference types="node" />
import { URL } from 'url';
import { BooleanFlag } from './interfaces';
import { FlagDefinition, OptionFlagDefaults, FlagParser } from './interfaces/parser';
/**
 * Create a custom flag.
 *
 * @example
 * type Id = string
 * type IdOpts = { startsWith: string; length: number };
 *
 * export const myFlag = custom<Id, IdOpts>({
 *   parse: async (input, opts) => {
 *     if (input.startsWith(opts.startsWith) && input.length === opts.length) {
 *       return input
 *     }
 *
 *     throw new Error('Invalid id')
 *   },
 * })
 */
export declare function custom<T, P = Record<string, unknown>>(defaults: {
    parse: FlagParser<T, string, P>;
    multiple: true;
} & Partial<OptionFlagDefaults<T, P, true>>): FlagDefinition<T, P>;
export declare function custom<T, P = Record<string, unknown>>(defaults: {
    parse: FlagParser<T, string, P>;
} & Partial<OptionFlagDefaults<T, P>>): FlagDefinition<T, P>;
export declare function custom<T = string, P = Record<string, unknown>>(defaults: Partial<OptionFlagDefaults<T, P>>): FlagDefinition<T, P>;
export declare function boolean<T = boolean>(options?: Partial<BooleanFlag<T>>): BooleanFlag<T>;
export declare const integer: FlagDefinition<number, {
    min?: number | undefined;
    max?: number | undefined;
}>;
export declare const directory: FlagDefinition<string, {
    exists?: boolean | undefined;
}>;
export declare const file: FlagDefinition<string, {
    exists?: boolean | undefined;
}>;
/**
 * Initializes a string as a URL. Throws an error
 * if the string is not a valid URL.
 */
export declare const url: FlagDefinition<URL, Record<string, unknown>>;
declare const stringFlag: FlagDefinition<string, Record<string, unknown>>;
export { stringFlag as string };
export declare const version: (opts?: Partial<BooleanFlag<boolean>>) => BooleanFlag<void>;
export declare const help: (opts?: Partial<BooleanFlag<boolean>>) => BooleanFlag<void>;
