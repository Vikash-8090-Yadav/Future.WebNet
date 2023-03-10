import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts";
import { countEntities } from "./store";
// Host exports for assertion.
declare namespace _assert {
  function fieldEquals(entityType: string, id: string, fieldName: string, expectedVal: string): bool;
  function equals(expected: ethereum.Value, actual: ethereum.Value): bool;
  function notInStore(entityType: string, id: string): bool;
}

export namespace assert {
  export function fieldEquals(entityType: string, id: string, fieldName: string, expectedVal: string): void {
    if (!_assert.fieldEquals(entityType, id, fieldName, expectedVal)) {
      throw new Error("Assertion Error");
    }
  }

  export function equals(expected: ethereum.Value, actual: ethereum.Value): void {
    if (!_assert.equals(expected, actual)) {
      throw new Error("Assertion Error");
    }
  }

  export function notInStore(entityType: string, id: string): void {
    if (!_assert.notInStore(entityType, id)) {
      throw new Error("Assertion Error");
    }
  }

  export function addressEquals(address1: Address, address2: Address): void {
    assert.equals(ethereum.Value.fromAddress(address1), ethereum.Value.fromAddress(address2));
  }

  export function bytesEquals(bytes1: Bytes, bytes2: Bytes): void {
    assert.equals(ethereum.Value.fromBytes(bytes1), ethereum.Value.fromBytes(bytes2));
  }
  
  export function i32Equals(number1: i32, number2: i32): void {
    assert.equals(ethereum.Value.fromI32(number1), ethereum.Value.fromI32(number2));
  }

  export function bigIntEquals(bigInt1: BigInt, bigInt2: BigInt): void {
    assert.equals(ethereum.Value.fromSignedBigInt(bigInt1), ethereum.Value.fromSignedBigInt(bigInt2));
  }

  export function booleanEquals(bool1: boolean, bool2: boolean): void {
    assert.equals(ethereum.Value.fromBoolean(bool1), ethereum.Value.fromBoolean(bool2));
  }

  export function stringEquals(string1: string, string2: string): void {
    assert.equals(ethereum.Value.fromString(string1), ethereum.Value.fromString(string2));
  }

  export function arrayEquals(array1: Array<ethereum.Value>, array2: Array<ethereum.Value>): void {
    assert.equals(ethereum.Value.fromArray(array1), ethereum.Value.fromArray(array2));
  }

  export function tupleEquals(tuple1: ethereum.Tuple, tuple2: ethereum.Tuple): void {
    assert.equals(ethereum.Value.fromTuple(tuple1), ethereum.Value.fromTuple(tuple2));
  }

  export function assertTrue(value: boolean): void {
    booleanEquals(true, value);
  }

  export function assertNull<T>(value: T): void {
    assertTrue(value == null);
  }

  export function assertNotNull<T>(value: T): void {
    assertTrue(value != null);
  }

  export function entityCount(entityType: string, expectedCount: i32): void {
    i32Equals(expectedCount, countEntities(entityType));
  }
}
