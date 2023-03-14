/// <reference types="chai" />
import type { providers } from "ethers";
import { Account } from "./misc/account";
import { BalanceChangeOptions } from "./misc/balance";
export declare function supportChangeEtherBalances(Assertion: Chai.AssertionStatic): void;
export declare function getBalanceChanges(transaction: providers.TransactionResponse | Promise<providers.TransactionResponse>, accounts: Array<Account | string>, options?: BalanceChangeOptions): Promise<import("ethers").BigNumber[]>;
//# sourceMappingURL=changeEtherBalances.d.ts.map