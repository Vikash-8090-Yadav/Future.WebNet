import { useState, useEffect, useCallback } from "react";
import { useWeb3 } from "../Web3Provider";
import Notification from "../Notification";
import { stateName } from "../../helpers/constants";

function ActorAssetAll() {
    const [assets, setAssets] = useState([]);
    const { web3, accounts, supplyChain } = useWeb3();
    const [reloading, setReloading] = useState(false);
    const [role, setRole] = useState(null)
    const [filterBy, setFilterBy] = useState("All");

    const [notificationOpen, setNotificationOpen] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(false);

    const convertWeiToEth = (wei) => {
        if (!web3) return;
        const eth = web3.utils.fromWei(wei, "ether");
        return Number(eth).toFixed(9);
    };

    useEffect(() => {
        const init = async () => {
            if (!web3 || !accounts || !supplyChain) return;

            const totalAssets = await supplyChain.methods.assetIdCounter().call();
            const assetsWithPriceAndState = [];
            for (let i = 1; i <= totalAssets; i++) {
                const infoAssets = await supplyChain.methods.payableAssetsById(i).call();
                const tracker = await supplyChain.methods.tracerAssets(i, infoAssets.trackerNumber).call();
                assetsWithPriceAndState.push({ id: i, price: infoAssets.price, state: infoAssets.state, time: tracker.time, address: tracker.actorAddress, buyStatus: tracker.buyStatus });
            }

            const role = await supplyChain.methods.getActorRole(accounts[0]).call();
            setRole(role);
            setAssets(assetsWithPriceAndState);
            setReloading(false);
        };
        if (web3) {
            init();
        }
    }, [web3, accounts, supplyChain, reloading]);

    const buyAsset = async (assetId, price) => {
        setLoading(true);
        setId(assetId);
        try {
            const result = await supplyChain.methods.purchaseAsset(assetId).send({
                from: accounts[0],
                value: price
            });
            if (result && assetId) {
                setSuccessMsg(
                    <span>
                        Asset with <strong>ID {assetId}</strong> succesfully purchased.
                    </span>
                );
                setLoading(false);
                setNotificationOpen(true);
            }
            console.log(result);
        } catch (error) {
            console.log(error);
            setErrorMsg(error.message);
            setLoading(false);
            setNotificationOpen(true);
        }
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setNotificationOpen(false);
            reset();
        }, 3000);

        return () => clearTimeout(timer);
    }, [notificationOpen, errorMsg, successMsg]);

    const reset = useCallback(() => {
        setSuccessMsg('');
        setErrorMsg('');
        setNotificationOpen(false);
    }, []);

    const handleReload = () => {
        setReloading(true);
    }

    const filteredAssets = assets.filter(asset => {
        if (filterBy === "All") return true;
        if (filterBy === "Buyable" && asset.state == 2 && role == 2) return true;
        if (filterBy === "Buyable" && asset.state == 3 && role == 3) return true;
        if (filterBy === "Buyable" && asset.state == 4 && role == 4) return true;
        if (filterBy === "Buyable" && asset.state == 5 && role == 5) return true;
        return false;
    })

    return (
        <div>
            <div className="mb-1">
                <h2 className="text-l font-bold text-gray-800">Filter</h2>
            </div>
            <div className="flex items-center justify-between mb-2">
                <div>
                    <div className="inline-block relative w-64">
                        <select
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            value={filterBy}
                            onChange={e => setFilterBy(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Buyable">Buyable</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10 13.415l5.707-5.707a1 1 0 111.414 1.414l-6.364 6.364a.997.997 0 01-1.414 0L2.879 8.122a1 1 0 011.414-1.414L10 13.415z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <button
                    className="bg-blue-500 text-white w-36 py-2 rounded hover:bg-blue-600 transition duration-200"
                    onClick={handleReload}
                    disabled={reloading}
                >
                    {reloading ? "Reloading..." : "Reload"}
                </button>
            </div>
            <table className="table-auto w-full text-left">
                <thead className="bg-gray-200 border-b border-gray-400">
                    <tr className="border-b-2 border-gray-200">
                        <th className="px-4 py-2 text-sm text-gray-600">ID</th>
                        <th className="px-4 py-2 text-sm text-gray-600">Price</th>
                        <th className="px-4 py-2 text-sm text-gray-600">Owner</th>
                        <th className="px-4 py-2 text-sm text-gray-600">[No. State] Status</th>
                        <th className="px-4 py-2 text-sm text-gray-600">Date</th>
                        <th className="px-4 py-2 text-sm text-gray-600">Buy</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAssets.map((asset) => (
                        <tr key={asset.id} className="hover:bg-gray-100">
                            <td className="border px-4 py-3">{asset.id}</td>
                            <td className="border px-4 py-3">{convertWeiToEth(asset.price)} ETH
                            </td>
                            <td className="border px-4 py-3">{asset.address}</td>
                            <td className="border px-4 py-3">[{asset.state}] {stateName[asset.state]}</td>
                            <td className="border px-4 py-3">{new Date(asset.time * 1000).toLocaleDateString()
                            }</td>
                            <td className="border px-4 py-3">
                                {asset.buyStatus == 0 && (
                                    <>
                                        {asset.state == 2 && role == 2 && asset.address != accounts && (
                                            <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200" onClick={() => buyAsset(asset.id, asset.price)}>{loading && id == asset.id ? "Loading..." : "Buy"}</button>
                                        )}
                                        {asset.state == 3 && role == 3 && asset.address != accounts && (
                                            <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200" onClick={() => buyAsset(asset.id, asset.price)}>{loading && id == asset.id ? "Loading..." : "Buy"}</button>
                                        )}
                                        {asset.state == 4 && role == 4 && asset.address != accounts && (
                                            <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200" onClick={() => buyAsset(asset.id, asset.price)}>{loading && id == asset.id ? "Loading..." : "Buy"}</button>
                                        )}
                                        {asset.state == 5 && role == 5 && asset.address != accounts && (
                                            <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200" onClick={() => buyAsset(asset.id, asset.price)}>{loading && id == asset.id ? "Loading..." : "Buy"}</button>
                                        )}
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {successMsg !== '' && notificationOpen && <Notification msg={successMsg} open={notificationOpen} bgColor="green" />}
            {errorMsg !== '' && notificationOpen && <Notification msg={errorMsg} open={notificationOpen} bgColor="red" />}
        </div>
    );
}

export default ActorAssetAll;
