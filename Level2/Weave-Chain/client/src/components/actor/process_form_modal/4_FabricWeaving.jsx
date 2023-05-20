import React, { useEffect, useState, useCallback } from "react";
import CryptoCompare from "cryptocompare";
import { useWeb3 } from '../../Web3Provider';
import Notification from "../../Notification";

const FabricWeaving = ({ isOpen, onClose, assetId }) => {
    const { web3, accounts, supplyChain } = useWeb3();

    const [exchangeRate, setExchangeRate] = useState(null)
    const [price, setPrice] = useState('')
    const [priceEth, setPriceEth] = useState('')
    const [loading, setLoading] = useState(false);

    const [notificationOpen, setNotificationOpen] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const formatPrice = (value) => {
        const formatter = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        });
        return formatter.format(value);
    };

    useEffect(() => {
        async function init() {
            const xRate = await CryptoCompare.price('ETH', ['IDR'])
            setExchangeRate(xRate)
        }
        init();
    }, [])

    const handleChange = (e) => {
        const value = e.target.value;
        const ethValue = value / exchangeRate.IDR || 0;
        setPrice(value);
        setPriceEth(ethValue);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (priceEth) {
            const weiPrice = web3.utils.toWei(priceEth.toFixed(18), "ether");
            try {
                const result = await supplyChain.methods.fabricWeaving(assetId, weiPrice).send({ from: accounts[0] });
                console.log(result);
                if (result && assetId) {
                    setSuccessMsg(
                        <span>
                            Asset with <strong>ID {assetId}</strong> succesfully updated at price {priceEth}
                        </span>
                    );
                    setNotificationOpen(true);
                }
            } catch (error) {
                setErrorMsg(error.message);
                setNotificationOpen(true);
            }
        }
        if (!priceEth) {
            if (price == '') {
                setErrorMsg(`Input price must not be empty!`);
            }
            else {
                setErrorMsg(
                    <span>
                        Invalid Price : <strong>{price}</strong>
                    </span>
                );
            }
            setNotificationOpen(true);
        }
    };

    useEffect(() => {
        setLoading(false);
        if (successMsg !== '') {
            setPrice('');
            setPriceEth('');
        }
        const timer = setTimeout(() => {
            setNotificationOpen(false);
            resetForm();
            if (successMsg !== '') {
                onClose();
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [notificationOpen, errorMsg, successMsg]);

    const resetForm = useCallback(() => {
        setSuccessMsg('');
        setErrorMsg('');
        setNotificationOpen(false);
        setLoading(false);
    }, []);

    return (
        <>
            {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                            onClick={onClose}
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>

                        <div
                            className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <form onSubmit={handleSubmit} className="max-w-md">
                                <h2 className="text-2xl text-center font-bold mb-8">Fabric Weaving</h2>
                                <div className="mb-1">
                                    <label htmlFor="assetId" className="block text-gray-700 font-medium mb-2">
                                        ID Asset
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <input
                                            type="text"
                                            name="assetId"
                                            id="assetId"
                                            value={assetId}
                                            className="block bg-slate-300 w-full border border-gray-400 px-4 py-2 rounded focus:outline-none focus:border-gray-500"
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
                                        Price (IDR)
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <input
                                            type="text"
                                            name="price"
                                            id="price"
                                            value={price}
                                            onChange={handleChange}
                                            className="block w-full border border-gray-400 px-4 py-2 rounded focus:outline-none focus:border-gray-500"
                                            placeholder="10,000,000"
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm">
                                                {formatPrice(price)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="block text-gray-700 font-small pl-1 mb-4">
                                    ({priceEth} ETH)
                                </div>
                                <button disabled={loading} type="submit" className="bg-blue-500 w-full text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
                                    {loading ? "Submitting..." : "Submit"}
                                </button>
                            </form>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm mr-4"
                                    onClick={onClose}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                    {successMsg !== '' && notificationOpen && <Notification msg={successMsg} open={notificationOpen} bgColor="green" />}
                    {errorMsg !== '' && notificationOpen && <Notification msg={errorMsg} open={notificationOpen} bgColor="red" />}
                </div>
            )}
        </>
    );
};

export default FabricWeaving;