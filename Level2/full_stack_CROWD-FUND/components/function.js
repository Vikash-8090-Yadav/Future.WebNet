import Web3Modal from "web3modal";
import React,{useEffect,useContext,useState} from 'react';

import { ethers } from 'ethers';
import { Data } from "@/pages/_app";


const connectingWithWallet = async () => {

    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      return provider;
    } catch (error) {
      console.log("error",error);
    }
  };
export {connectingWithWallet};
