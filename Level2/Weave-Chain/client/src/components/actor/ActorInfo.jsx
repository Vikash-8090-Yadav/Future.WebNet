import React, { useState, useEffect } from "react";
import { useWeb3 } from '../Web3Provider';
import { rolesName } from "../../helpers/constants";

const ActorInfoModal = ({ isOpen, onClose }) => {
    const [actors, setActors] = useState({
        id: null,
        name: null,
        role: null,
        place: null,
        address: null,
    });
    const { accounts, supplyChain } = useWeb3();

    useEffect(() => {
        async function getInfoWeb3() {
            if (window.ethereum) {
                const actorInfo = await supplyChain.methods.actorsByAddress(accounts[0]).call();
                const id = actorInfo[0];
                const address = actorInfo[1];
                const name = actorInfo[2];
                const role = actorInfo[3];
                const place = actorInfo[4];

                setActors({
                    id,
                    name,
                    role,
                    place,
                    address,
                })
            }
        }
        getInfoWeb3();
    }, [accounts, supplyChain]);

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
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3
                                        className="text-lg text-center leading-6 font-bold text-gray-900">Actor Information</h3>
                                    <div className="mt-2">
                                        <div className="mb-2">
                                            <span className="font-medium">ID:</span> {actors.id}
                                        </div>
                                        <div className="mb-2">
                                            <span className="font-medium">Name:</span> {actors.name}
                                        </div>
                                        <div className="mb-2">
                                            <span className="font-medium">Role: </span>{rolesName[actors.role]}</div>
                                        <div className="mb-2">
                                            <span className="font-medium">Place:</span> {actors.place}
                                        </div>
                                        <div className="mb-2">
                                            <span className="font-medium">Address:</span>{" "}
                                            {actors.address}
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                </div>
            )}
        </>
    );
};

export default ActorInfoModal;