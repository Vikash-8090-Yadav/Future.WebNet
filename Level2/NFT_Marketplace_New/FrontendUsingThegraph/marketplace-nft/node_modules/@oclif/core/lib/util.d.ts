import { Command } from './command';
import { ArgInput } from './interfaces/parser';
export declare function pickBy<T extends {
    [s: string]: T[keyof T];
} | ArrayLike<T[keyof T]>>(obj: T, fn: (i: T[keyof T]) => boolean): Partial<T>;
export declare function compact<T>(a: (T | undefined)[]): T[];
export declare function uniqBy<T>(arr: T[], fn: (cur: T) => any): T[];
type SortTypes = string | number | undefined | boolean;
export declare function sortBy<T>(arr: T[], fn: (i: T) => SortTypes | SortTypes[]): T[];
export declare function castArray<T>(input?: T | T[]): T[];
export declare function isProd(): boolean;
export declare function maxBy<T>(arr: T[], fn: (i: T) => number): T | undefined;
export declare function sumBy<T>(arr: T[], fn: (i: T) => number): number;
export declare function capitalize(s: string): string;
export declare const dirExists: (input: string) => Promise<string>;
export declare const fileExists: (input: string) => Promise<string>;
export declare function isTruthy(input: string): boolean;
export declare function isNotFalsy(input: string): boolean;
export declare function requireJson<T>(...pathParts: string[]): T;
/**
 * Ensure that the provided args are an object. This is for backwards compatibility with v1 commands which
 * defined args as an array.
 *
 * @param args Either an array of args or an object of args
 * @returns ArgInput
 */
export declare function ensureArgObject(args?: any[] | ArgInput | {
    [name: string]: Command.Arg.Cached;
}): ArgInput;
export {};
