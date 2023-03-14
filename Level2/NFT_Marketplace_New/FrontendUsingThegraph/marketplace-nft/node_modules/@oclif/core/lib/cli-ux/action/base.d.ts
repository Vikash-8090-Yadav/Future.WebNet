export interface ITask {
    action: string;
    status: string | undefined;
    active: boolean;
}
export type ActionType = 'spinner' | 'simple' | 'debug';
export interface Options {
    stdout?: boolean;
}
export declare class ActionBase {
    type: ActionType;
    std: 'stdout' | 'stderr';
    protected stdmocks?: ['stdout' | 'stderr', string[]][];
    private stdmockOrigs;
    start(action: string, status?: string, opts?: Options): void;
    stop(msg?: string): void;
    private get globals();
    get task(): ITask | undefined;
    set task(task: ITask | undefined);
    protected get output(): string | undefined;
    protected set output(output: string | undefined);
    get running(): boolean;
    get status(): string | undefined;
    set status(status: string | undefined);
    pauseAsync<T extends any>(fn: () => Promise<T>, icon?: string): Promise<T>;
    pause(fn: () => any, icon?: string): Promise<any>;
    protected _start(): void;
    protected _stop(_: string): void;
    protected _resume(): void;
    protected _pause(_?: string): void;
    protected _updateStatus(_: string | undefined, __?: string): void;
    protected _stdout(toggle: boolean): void;
    protected _flushStdout(): void;
    protected _write(std: 'stdout' | 'stderr', s: string | string[]): void;
}
