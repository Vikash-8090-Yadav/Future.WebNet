import React, { useState, useEffect } from "react";
import AppFooter from "../components/AppFooter";
import RegisterForm from "../components/owner/RegisterForm";
import ListActor from "../components/owner/ListActor";
import { useWeb3 } from '../components/Web3Provider';

const Register = () => {
    const { accounts, supplyChain } = useWeb3();
    const [contractOwner, setContractOwner] = useState(null);

    useEffect(() => {
        const fetchOwner = async () => {
            try {
                const owner = await supplyChain.methods.addressContractOwner().call();
                setContractOwner(owner);
            } catch (error) {
                console.error("Failed to fetch contract owner address", error);
            }
        };
        fetchOwner();
    }, []);
    if (accounts == contractOwner) {
        return (
            <div className="bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-bold mb-8 text-gray-900 text-center pt-6">
                    Actor Register Page
                </h1>
                <div className="flex px-4">
                    <RegisterForm />
                    <ListActor />
                </div>
                <AppFooter />
            </div>
        );
    } else {
        return (
            <div className="bg-gray-100 min-h-screen">
                <div className="h-screen flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold mb-8">
                        Only the contract owner can access this page.
                    </h1>
                </div>
            </div>
        );
    }
};

export default Register;
