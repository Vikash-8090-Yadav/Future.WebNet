import { OutputArgs, OutputFlags, ParserInput, ParserOutput } from '../interfaces/parser';
export declare class Parser<T extends ParserInput, TFlags extends OutputFlags<T['flags']>, BFlags extends OutputFlags<T['flags']>, TArgs extends OutputArgs<T['args']>> {
    private readonly input;
    private readonly argv;
    private readonly raw;
    private readonly booleanFlags;
    private readonly flagAliases;
    private readonly context;
    private readonly metaData;
    private currentFlag?;
    constructor(input: T);
    parse(): Promise<ParserOutput<TFlags, BFlags, TArgs>>;
    private _flags;
    private _parseFlag;
    private _validateOptions;
    private _args;
    private _debugOutput;
    private _debugInput;
    private get _argTokens();
    private get _flagTokens();
    private _setNames;
}
