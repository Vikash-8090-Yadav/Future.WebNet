import type { Instruction, OpcodeTable, opcodeObject, opcodes } from "./types";
export type { Instruction, OpcodeTable, opcodeObject, opcodes };
/**
 * parseCode - return a list of instructions given a 0x-prefixed code string.
 *
 * If numInstructions is not passed in, we attempt to strip contract
 * metadata.  This won't work very well if the code is for a constructor or a
 * contract that can create other contracts, but it's better than nothing.
 *
 * WARNING: Don't invoke the function that way if you're dealing with a
 * constructor with arguments attached!  Then you could get disaster!
 *
 * If you pass in numInstructions (hint: count the semicolons in the source
 * map, then add one) this is used to exclude metadata instead.
 *
 * @param  {String} hexString Hex string representing the code
 * @return Array               Array of instructions
 */
export declare function parseCode(hexString: string, numInstructions?: number): Instruction[];
declare const _default: {
    parseCode: typeof parseCode;
};
export default _default;
