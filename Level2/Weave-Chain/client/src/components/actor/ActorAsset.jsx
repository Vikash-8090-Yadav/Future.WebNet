import React, { useState, useEffect } from "react";
import { useWeb3 } from "../Web3Provider";
import CreateThread from "./process_form_modal/2_CreateThread"
import DistributeThread from "./process_form_modal/3_DistributeThread"
import FabricWeaving from "./process_form_modal/4_FabricWeaving"
import SellFabric from "./process_form_modal/5_SellFabric"
import { stateName } from "../../helpers/constants";

function ActorAsset() {
    const [assets, setAssets] = useState([]);
    const { web3, accounts, supplyChain } = useWeb3();
    const [selectedAssetId, setSelectedAssetId] = useState(null);
    const [reloading, setReloading] = useState(false);
    const [role, setRole] = useState(null)

    const [createThreadModalOpen, setCreateThreadModalOpen] = useState(false);
    const [distributeThreadModalOpen, setDistributeThreadModalOpen] = useState(false);
    const [fabricWeavingModalOpen, setFabricWeavingModalOpen] = useState(false);
    const [sellFabricModalOpen, setSellFabricModalOpen] = useState(false);

    const convertWeiToEth = (wei) => {
        if (!web3) return;
        const eth = web3.utils.fromWei(wei, "ether");
        return Number(eth).toFixed(9);
    };

    useEffect(() => {
        const init = async () => {
            if (!web3 || !accounts || !supplyChain) return;

            const actorAssets = await supplyChain.methods
                .getActorAssets(accounts[0])
                .call();

            const assetsWithPriceAndState = await Promise.all(
                actorAssets.map(async (asset) => {
                    const infoAssets = await supplyChain.methods
                        .payableAssetsById(asset.id)
                        .call();
                    const tracker = await supplyChain.methods.tracerAssets(asset.id, infoAssets.trackerNumber).call();
                    return { ...asset, time: tracker.time, price: infoAssets.price, state: infoAssets.state };
                })
            );

            const role = await supplyChain.methods.getActorRole(accounts[0]).call();
            setRole(role);
            setAssets(assetsWithPriceAndState);
            setReloading(false);
        };
        if (web3) {
            init();
        }
    }, [web3, accounts, supplyChain, reloading]);

    const handleCreateThreadModal = (assetId) => {
        setSelectedAssetId(assetId);
        setCreateThreadModalOpen(true);
    }
    const handleDistributeThreadModal = (assetId) => {
        setSelectedAssetId(assetId);
        setDistributeThreadModalOpen(true);
    }
    const handleFabricWeavingModal = (assetId) => {
        setSelectedAssetId(assetId);
        setFabricWeavingModalOpen(true);
    }
    const handleSellFabricModal = (assetId) => {
        setSelectedAssetId(assetId);
        setSellFabricModalOpen(true);
    }

    const handleCloseModal = () => {
        setSelectedAssetId(null);
        setCreateThreadModalOpen(false);
        setDistributeThreadModalOpen(false);
        setFabricWeavingModalOpen(false);
        setSellFabricModalOpen(false);
    }
    const handleReload = () => {
        setReloading(true);
    }
    return (
        <div>
            <div className="flex items-center justify-between my-4">
                <h1 className="text-xl font-bold text-center">Your Assets</h1>
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
                        <th className="px-4 py-2 text-sm font-bold text-gray-600">ID</th>
                        <th className="px-4 py-2 text-sm font-bold text-gray-600">Price</th>
                        <th className="px-4 py-2 text-sm font-bold text-gray-600">[No. State] Status</th>
                        <th className="px-4 py-2 text-sm font-bold text-gray-600">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {assets.map((asset, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            {asset.id != 0 && (
                                <React.Fragment>
                                    <td className="border px-4 py-3">{asset.id}</td>
                                    <td className="border px-4 py-3">{convertWeiToEth(asset.price)} ETH</td>
                                    <td className="border px-4 py-3">
                                        [{asset.state}] {stateName[asset.state]}
                                        {asset.state == 1 && role == 1 && (
                                            <button className="ml-6 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-200" onClick={() => handleCreateThreadModal(asset.id)}>Process</button>
                                        )}
                                        {asset.state == 2 && role == 2 && (
                                            <button className="ml-6 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-200" onClick={() => handleDistributeThreadModal(asset.id)}>Process</button>
                                        )}
                                        {asset.state == 3 && role == 3 && (
                                            <button className="ml-6 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-200" onClick={() => handleFabricWeavingModal(asset.id)}>Process</button>
                                        )}
                                        {asset.state == 4 && role == 4 && (
                                            <button className="ml-6 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-200" onClick={() => handleSellFabricModal(asset.id)}>Process</button>
                                        )}
                                    </td>
                                    <td className="border px-4 py-3">{new Date(asset.time * 1000).toLocaleString()}</td>
                                </React.Fragment>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <CreateThread isOpen={createThreadModalOpen} onClose={handleCloseModal} assetId={selectedAssetId} />
            <DistributeThread isOpen={distributeThreadModalOpen} onClose={handleCloseModal} assetId={selectedAssetId} />
            <FabricWeaving isOpen={fabricWeavingModalOpen} onClose={handleCloseModal} assetId={selectedAssetId} />
            <SellFabric isOpen={sellFabricModalOpen} onClose={handleCloseModal} assetId={selectedAssetId} />
        </div>
    );
}

export default ActorAsset;
