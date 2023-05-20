import React, { useState, useCallback, useEffect } from "react";
import { useWeb3 } from "../Web3Provider";
import Notification from "../Notification";

const Register = () => {
    const { accounts, supplyChain } = useWeb3();
    const [formState, setFormState] = useState({
        address: '',
        name: '',
        role: 1,
        place: '',
    });
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }, []);

    const handleRegisterActor = useCallback(async () => {
        setLoading(true);
        try {
            const register = await supplyChain.methods
                .registerActor(formState.address, formState.name, formState.role, formState.place)
                .send({ from: accounts[0] });
            console.log(register);
            if (register) {
                setNotificationOpen(true);
                setSuccessMsg(`${formState.address} Berhasil Terdaftar`);
                resetForm();
            }
        } catch (err) {
            setNotificationOpen(true);
            if (!formState.name || !formState.place || !formState.address) {
                setErrorMsg("Input field must not be empty!")
            }
            else {
                if (err.code == '4001') {
                    setErrorMsg(err.message);
                    console.log(err);
                } if (err.code == '-32603') {
                    setErrorMsg(`The user's address is already registered.`);
                    console.log(err);
                } if (err.code == 'INVALID_ARGUMENT') {
                    setErrorMsg(`Invalid ${err.argument} : ${err.value} (${err.code})`);
                    console.log(err);
                }
            }
        }
    }, [accounts, supplyChain, formState]);

    const resetForm = useCallback(() => {
        setFormState({
            address: '',
            name: '',
            role: 1,
            place: '',
        });
        setLoading(false);
    }, []);

    useEffect(() => {
        resetForm();
        setNotificationOpen(false);
        setErrorMsg('');
        setSuccessMsg('');
    }, [accounts]);

    useEffect(() => {
        setLoading(false);
        const timer = setTimeout(() => {
            setNotificationOpen(false);
            setErrorMsg('');
            setSuccessMsg('');
        }, 3000);

        return () => clearTimeout(timer);
    }, [notificationOpen, errorMsg]);

    return (
        <>
            <div className="max-w-xl bg-white rounded py-10 px-8 ml-6 shadow-lg pt">
                <h2 className="text-lg text-center font-medium">Your Address</h2>
                <h2 className="text-sm text-center font-small mb-4">{accounts}</h2>
                <div className="my-4">
                    <label className="block text-gray-700 font-medium mb-2">Address</label>
                    <input
                        type="input"
                        name="address"
                        placeholder="0x00..."
                        className="block w-full border border-gray-400 px-4 py-2 rounded focus:outline-none focus:border-gray-500"
                        value={formState.address}
                        onChange={handleInputChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Name</label>
                    <input
                        type="input"
                        name="name"
                        placeholder="name..."
                        className="block w-full border border-gray-400 px-4 py-2 rounded focus:outline-none focus:border-gray-500"
                        value={formState.name}
                        onChange={handleInputChange} />
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 font-medium mb-2">Role</label>
                </div>
                <div className="inline-block relative w-full mb-4">
                    <select
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-3 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                        name="role"
                        value={formState.role}
                        onChange={handleInputChange}
                    >
                        <option value="1">Thread Manufacturer</option>
                        <option value="2">Thread Distributor</option>
                        <option value="3">Weaver</option>
                        <option value="4">Retailer</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 pb-2 text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" clipRule="evenodd" d="M10 13.415l5.707-5.707a1 1 0 111.414 1.414l-6.364 6.364a.997.997 0 01-1.414 0L2.879 8.122a1 1 0 011.414-1.414L10 13.415z" />
                        </svg>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Based In</label>
                    <input
                        type="input"
                        name="place"
                        placeholder="place..."
                        className="block w-full border border-gray-400 px-4 py-2 rounded focus:outline-none focus:border-gray-500"
                        value={formState.place}
                        onChange={handleInputChange} />
                </div>
                <div className="text-center">
                    <button
                        disabled={loading}
                        className="bg-blue-500 w-full text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                        onClick={handleRegisterActor}>
                        {loading ? "Loading..." : "Register"}
                    </button>
                </div>
            </div>
            {notificationOpen && successMsg != '' && <Notification msg={successMsg} open={notificationOpen} bgColor="green" />}
            {notificationOpen && errorMsg != '' && <Notification msg={errorMsg} open={notificationOpen} bgColor="red" />}
        </>
    );
};

export default Register;
