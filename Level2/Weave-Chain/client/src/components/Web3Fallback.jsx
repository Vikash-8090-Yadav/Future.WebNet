import React, { useEffect } from "react";

function Web3Fallback() {
    useEffect(() => {
        const initializeWeb3 = async () => {
            if (typeof window.ethereum == "undefined") {
                window.location.reload()
            } 
        };
        initializeWeb3();
    })
    return (
        <div className="bg-gray-50 h-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold mb-8">
                Failed to connect to Web3
            </h1>
            <p className="text-lg mb-8">
                Please connect to the Ethereum network using Metamask.
            </p>
        </div>
    );
}

export default Web3Fallback;
