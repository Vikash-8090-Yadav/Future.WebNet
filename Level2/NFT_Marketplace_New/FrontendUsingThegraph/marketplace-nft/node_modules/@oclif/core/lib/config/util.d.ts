export declare function flatMap<T, U>(arr: T[], fn: (i: T) => U[]): U[];
export declare function mapValues<T extends Record<string, any>, TResult>(obj: {
    [P in keyof T]: T[P];
}, fn: (i: T[keyof T], k: keyof T) => TResult): {
    [P in keyof T]: TResult;
};
export declare function exists(path: string): Promise<boolean>;
export declare function resolvePackage(id: string, paths: {
    paths: string[];
}): string;
export declare function loadJSON(path: string): Promise<any>;
export declare function compact<T>(a: (T | undefined)[]): T[];
export declare function uniq<T>(arr: T[]): T[];
export declare function Debug(...scope: string[]): (..._: any) => void;
export declare function getPermutations(arr: string[]): Array<string[]>;
export declare function getCommandIdPermutations(commandId: string): string[];
/**
 * Return an array of ids that represent all the usable combinations that a user could enter.
 *
 * For example, if the command ids are:
 * - foo:bar:baz
 * - one:two:three
 * Then the usable ids would be:
 * - foo
 * - foo:bar
 * - foo:bar:baz
 * - one
 * - one:two
 * - one:two:three
 *
 * This allows us to determine which parts of the argv array belong to the command id whenever the topicSeparator is a space.
 *
 * @param commandIds string[]
 * @returns string[]
 */
export declare function collectUsableIds(commandIds: string[]): string[];
