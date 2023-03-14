import { Address, ethereum } from "@graphprotocol/graph-ts";
import { log } from "./log";

export { clearStore, logStore, countEntities } from "./store";
export { dataSourceMock } from "./data_source_mock";
export { newMockEvent, newMockCall } from "./defaults";
export { assert } from "./assert";
export { log } from "./log";

const CLASS_IN_FINISHED_STATE_ERROR_MESSAGE =
  "You can't modify a MockedFunction instance after it has been saved.";

declare function _registerTest(name: string, shouldFail: bool, funcIdx: u32): void;
export function test(name: string, f: () => void, shouldFail: bool = false): void {
  _registerTest(name, shouldFail, f.index as u32);
}

declare function _registerDescribe(name: string, funcIdx: u32): void;
export function describe(name: string, f: () => void): void {
  _registerDescribe(name, f.index as u32);
}

declare function _registerHook(funcIdx: u32, type: string): void;

export function beforeAll(f: () => void): void {
  _registerHook(f.index as u32, "beforeAll");
}

export function afterAll(f: () => void): void {
  _registerHook(f.index as u32, "afterAll");
}

export function beforeEach(f: () => void): void {
  _registerHook(f.index as u32, "beforeEach");
}

export function afterEach(f: () => void): void {
  _registerHook(f.index as u32, "afterEach");
}

export declare function mockIpfsFile(hash: string, file_path: string): void;

export declare function mockFunction(
  contractAddress: Address,
  fnName: string,
  fnSignature: string,
  fnArgs: ethereum.Value[],
  returnValue: ethereum.Value[],
  reverts: bool
): void;

export class MockedFunction {
  isFinishedState: bool = false;
  contractAddress: Address;
  name: string;
  signature: string;
  args: ethereum.Value[] = [];

  constructor(contractAddress: Address, fnName: string, fnSignature: string) {
    this.contractAddress = contractAddress;
    this.name = fnName;
    this.signature = fnSignature;
  }

  withArgs(args: ethereum.Value[]): MockedFunction {
    if (!this.isFinishedState) {
      this.args = args;
    } else {
      log.critical(CLASS_IN_FINISHED_STATE_ERROR_MESSAGE, []);
    }
    return this;
  }

  returns(returnValue: ethereum.Value[]): void {
    if (!this.isFinishedState) {
      mockFunction(
        this.contractAddress,
        this.name,
        this.signature,
        this.args,
        returnValue,
        false
      );
      this.isFinishedState = true;
    } else {
      log.critical(CLASS_IN_FINISHED_STATE_ERROR_MESSAGE, []);
    }
  }

  reverts(): void {
    if (!this.isFinishedState) {
      mockFunction(
        this.contractAddress,
        this.name,
        this.signature,
        this.args,
        [],
        true
      );
      this.isFinishedState = true;
    } else {
      log.critical(CLASS_IN_FINISHED_STATE_ERROR_MESSAGE, []);
    }
  }
}

export function createMockedFunction(
  contractAddress: Address,
  fnName: string,
  fnSignature: string
): MockedFunction {
  return new MockedFunction(contractAddress, fnName, fnSignature);
}
