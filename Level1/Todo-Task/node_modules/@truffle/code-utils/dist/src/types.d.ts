export interface Instruction {
    pc: number;
    name: string;
    pushData?: string;
}
export declare type opcodeObject = Instruction;
export interface OpcodeTable {
    [hex: number]: string;
}
export declare type opcodes = OpcodeTable;
