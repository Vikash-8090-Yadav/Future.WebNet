import type * as Format from "../format";
import type * as Abi from "@truffle/abi-utils";
import type * as Common from "../common";
import type { WrapResponse } from "../types";
/**
 * @Category Interfaces
 */
export interface Resolution {
    method: Method;
    arguments: Format.Values.Value[];
    options: Common.Options;
}
/**
 * This type represents a contract method or constructor.  Note that it's not a
 * method for a specific instance, so there's no address field.
 * @Category Interfaces
 */
export interface Method {
    /**
     * The method name; omitted for constructors.
     */
    name?: string;
    /**
     * The method selector; for a constructor, this is instead the (linked)
     * constructor bytecode.
     */
    selector: string;
    /**
     * The types of the inputs (each of which may optionally have a name).
     */
    inputs: Format.Types.OptionallyNamedType[];
    /**
     * The ABI entry for the method.
     */
    abi: Abi.FunctionEntry | Abi.ConstructorEntry;
}
export interface WrapOptions {
    userDefinedTypes?: Format.Types.TypesById;
    name?: string;
    loose?: boolean;
    oldOptionsBehavior?: boolean;
    specificityFloor?: number;
}
export interface ResolveOptions {
    userDefinedTypes?: Format.Types.TypesById;
    allowOptions?: boolean;
}
export declare type Case<TypeType, ValueType, RequestType> = (dataType: TypeType, input: unknown, options: WrapOptions) => Generator<RequestType, ValueType, WrapResponse>;
export interface ContractInput {
    address: string;
    selector: never;
}
export interface FunctionExternalInput {
    address: any;
    selector: any;
}
export interface TypeValueInput {
    type: string;
    value: any;
}
export interface EncodingTextInput {
    encoding: "utf8";
    text: string;
}
export interface Uint8ArrayLike {
    length: number;
    [index: number]: number;
}
export declare type AddressLikeType = Format.Types.AddressType | Format.Types.ContractType;
export declare type AddressLikeValue = Format.Values.AddressValue | Format.Values.ContractValue;
export declare type IntegerType = Format.Types.UintType | Format.Types.IntType;
export declare type IntegerOrEnumType = IntegerType | Format.Types.EnumType;
export declare type DecimalType = Format.Types.FixedType | Format.Types.UfixedType;
export declare type NumericType = IntegerType | DecimalType;
export declare type IntegerValue = Format.Values.UintValue | Format.Values.IntValue;
export declare type IntegerOrEnumValue = IntegerValue | Format.Values.EnumValue;
export declare type DecimalValue = Format.Values.FixedValue | Format.Values.UfixedValue;
export declare type TupleLikeType = Format.Types.TupleType | Format.Types.StructType;
export declare type TupleLikeValue = Format.Values.TupleValue | Format.Values.StructValue;
