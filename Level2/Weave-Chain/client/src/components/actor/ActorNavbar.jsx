import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ActorInfo from "./ActorInfo";
import { FaUserCircle } from 'react-icons/fa';
import { MdCircle } from "react-icons/md";

const ActorNavbar = () => {
  const location = useLocation();
  const isActive = (pathname) => location.pathname === pathname;
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          setIsConnected(true);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error("Metamask not detected");
      }
    };
    initializeWeb3();

    if (isConnected) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length === 0) {
          setIsConnected(false);
        } else {
          setIsConnected(true);
        }
      });
      return () => {
        window.ethereum.removeAllListeners("accountsChanged");
      };
    }
  }, [isConnected]);


  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  return (
    <nav className="bg-transparent px-4 py-3 font-sans">
      <div className="max-w-full mx-auto flex items-center justify-between">
        <div className="md:flex">
          <Link
            to="/dashboard"
            className={`text-black hover:text-blue-500 mx-4 ${isActive("/dashboard") &&
              "text-black font-bold hover:text-gray-950"
              }`}
          >
            Dashboard
          </Link>
          <Link
            to="/market"
            className={`text-black hover:text-blue-500 mx-4 ${isActive("/market") &&
              "text-black font-bold hover:text-gray-950"
              }`}
          >
            Market
          </Link>
          <Link
            to="/trace-product"
            className={`text-black hover:text-blue-500 mx-4 ${isActive("/trace-product") &&
              "text-black font-bold hover:text-gray-950"
              }`}
          >
            Trace Product
          </Link>
        </div>
        <div className="flex items-center">
          <div className="hidden md:block">
            {isConnected ? (
              <div className="text-black mx-4 flex items-center">
                <button onClick={handleOpenModal}>
                  <FaUserCircle className="mr-2 hover:text-blue-500" />
                </button>
                Connected
                <MdCircle className="text-green-400 ml-1 h-3 m-auto" />
              </div>
            ) : (
              <div className="text-black mx-4 flex items-center">
                <button onClick={handleOpenModal}>
                  <FaUserCircle className="mr-2 hover:text-blue-500" />
                </button>
                Not Connected
                <MdCircle className="text-red-400 ml-1 h-3 m-auto" />
              </div>
            )}

          </div>

          <ActorInfo isOpen={modalOpen} onClose={handleCloseModal} />
        </div>
      </div>
    </nav>
  );
};

export default ActorNavbar;
