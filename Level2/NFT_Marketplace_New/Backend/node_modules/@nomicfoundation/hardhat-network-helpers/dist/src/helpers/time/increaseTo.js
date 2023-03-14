"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.increaseTo = void 0;
const utils_1 = require("../../utils");
const mine_1 = require("../mine");
const latest_1 = require("./latest");
/**
 * Mines a new block whose timestamp is `timestamp`
 *
 * @param timestamp Must be bigger than the latest block's timestamp
 */
async function increaseTo(timestamp) {
    const provider = await (0, utils_1.getHardhatProvider)();
    const normalizedTimestamp = (0, utils_1.toBigInt)(timestamp);
    const latestTimestamp = BigInt(await (0, latest_1.latest)());
    (0, utils_1.assertLargerThan)(normalizedTimestamp, latestTimestamp, "timestamp");
    await provider.request({
        method: "evm_setNextBlockTimestamp",
        params: [(0, utils_1.toRpcQuantity)(normalizedTimestamp)],
    });
    await (0, mine_1.mine)();
}
exports.increaseTo = increaseTo;
//# sourceMappingURL=increaseTo.js.map