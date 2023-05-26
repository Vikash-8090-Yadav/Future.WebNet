import React, { useState } from "react";
import { useWeb3 } from '../Web3Provider';
import { rolesName, stateName } from "../../helpers/constants";

const TraceProduct = () => {
    const { web3, supplyChain } = useWeb3();
    const [assetHistory, setAssetHistory] = useState([]);
    const [moreDetails, setMoreDetails] = useState(false);
    const [asset, setAsset] = useState();
    const [loading, setLoading] = useState(false);

    const convertWeiToEth = (wei) => {
        if (!web3) return;
        const eth = web3.utils.fromWei(wei, "ether");
        return Number(eth).toFixed(9);
    };


    const getAssetById = async (assetId) => {
        if (window.ethereum) {
            if (window.ethereum) {
                try {
                    const assetHistoryArray = [];
                    const payableAssets = await supplyChain.methods.payableAssetsById(assetId).call();
                    for (let i = 1; i <= payableAssets.trackerNumber; i++) {
                        const tracker = await supplyChain.methods.tracerAssets(assetId, i).call();
                        const actors = await supplyChain.methods.actorsByAddress(tracker.actorAddress).call();
                        assetHistoryArray.push({ id: assetId, price: tracker.price, state: tracker.state, actor: tracker.actorAddress, name: actors.name, role: actors.role, place: actors.place, date: tracker.time });
                    }
                    setAssetHistory(assetHistoryArray);
                    if (assetHistoryArray.length === 0) {
                        setAsset(null);
                    }
                    else if (assetHistoryArray[0].price === 0) {
                        setAsset(null);
                    }
                    else {
                        setAsset(assetHistoryArray[0].price);
                    }
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                    setLoading(false);
                }
            }
        }
    }

    const handleSearch = async (event) => {
        event.preventDefault();
        const assetId = event.target.elements.assetId.value;
        if (assetId != "") {
            setLoading(true);
            await getAssetById(assetId);
        }
    }

    const handleMoreDetails = async () => {
        setMoreDetails(true);
    }
    const handleHideDetails = async () => {
        setMoreDetails(false);
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <div className="flex items-center rounded-md mb-6 mt-2">
                    <input className="rounded-l-md border bg-transparent px-4 py-2 focus:outline-none" type="text" name="assetId" placeholder="Search by ID..." />
                    <button disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white py-2 ml-4 px-4 rounded-r-md">
                        {loading ? "Searching..." : "Search"}
                    </button>
                </div>
            </form>
            
            <h1 className="text-xl font-bold my-4">Assets History</h1>
            <table className="table-auto w-full text-left mb-6">
                <thead className="bg-gray-200 border-b border-gray-400">
                    <tr className="border-b-2 border-gray-200">
                        <th className="px-4 py-2 text-sm text-gray-600">ID</th>
                        <th className="px-4 py-2 text-sm text-gray-600">Price</th>
                        <th className="px-4 py-2 text-sm text-gray-600">State</th>
                        <th className="px-4 py-2 text-sm text-gray-600">Actor</th>
                        {moreDetails && (
                            <React.Fragment>
                                <th className="px-4 py-2 text-sm text-gray-600">Name</th>
                                <th className="px-4 py-2 text-sm text-gray-600">Role</th>
                                <th className="px-4 py-2 text-sm text-gray-600">Place</th>
                            </React.Fragment>
                        )}
                        <th className="px-4 py-2 text-sm text-gray-600">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {assetHistory.map((history, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            {history.name && (
                                <>
                                    <td className="border px-4 py-2">{history.id}</td>
                                    <td className="border px-4 py-2">{convertWeiToEth(history.price)} ETH</td>
                                    <td className="border px-4 py-2">{stateName[history.state]}</td>
                                    <td className="border px-4 py-2">{history.actor}</td>
                                    {moreDetails && (
                                        <>
                                            <td className="border px-4 py-2">{history.name}</td>
                                            <td className="border px-4 py-2">{rolesName[history.role]}</td>
                                            <td className="border px-4 py-2">{history.place}</td>
                                        </>
                                    )}
                                    <td className="border px-4 py-2">{new Date(history.date * 1000).toLocaleString()}</td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {asset === null && (
                <div className="text-center mb-4 font-medium">
                    History Asset Not Found.{asset}
                </div>
            )}
            <div className="text-center">
                {moreDetails === false && (
                    <button className="bg-blue-500 mb-6 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200" onClick={() => handleMoreDetails()}>More Details</button>
                )}
                {moreDetails === true && (
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200" onClick={() => handleHideDetails()}>Hide Details</button>
                )}
            </div>
        </div>
    );
};

export default TraceProduct;
