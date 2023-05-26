import React, { useEffect, useCallback, useState } from "react";
import CryptoCompare from "cryptocompare";
import { useWeb3 } from '../../Web3Provider';
import Notification from "../../Notification";

const AddRawMaterial = () => {
    const { web3, accounts, supplyChain } = useWeb3();
    const [exchangeRate, setExchangeRate] = useState(null);
    const [price, setPrice] = useState('');
    const [priceEth, setPriceEth] = useState('');
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
        if (priceEth) {
            const weiPrice = web3.utils.toWei(priceEth.toFixed(18), "ether");
            setLoading(true);
            try {
                const result = await supplyChain.methods.addRawMaterial(weiPrice).send({ from: accounts[0] });
                const assetId = await supplyChain.methods.assetIdCounter().call();
                if (result && assetId) {
                    setSuccessMsg(
                        <span>
                            Asset succesfully created with <strong>ID {assetId}</strong>
                        </span>
                    );
                    console.log(result);
                    setNotificationOpen(true);
                }
            } catch (error) {
                setErrorMsg(error.message);
                console.log(error);
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
        }, 3000);

        return () => clearTimeout(timer);
    }, [notificationOpen, errorMsg, successMsg]);

    const resetForm = useCallback(() => {
        setSuccessMsg('');
        setErrorMsg('');
        setNotificationOpen(false);
        // setLoading(false);
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit} className="w-80">
                <h2 className="text-2xl text-center font-bold my-2">Add Asset (Raw Material)</h2>
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

            {successMsg !== '' && notificationOpen && <Notification msg={successMsg} open={notificationOpen} bgColor="green" />}
            {errorMsg !== '' && notificationOpen && <Notification msg={errorMsg} open={notificationOpen} bgColor="red" />}
        </div>
    );
};

export default AddRawMaterial;
