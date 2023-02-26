import React,{useEffect,useContext,useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaHandsHelping} from 'react-icons/fa';
import Logo from '../images/logo.png'
import { Data } from '@/pages/_app';
import Web3Modal from "web3modal";
import { ethers } from 'ethers';
//import { connectingWithWallet } from './function';
import Contract from '../artifacts/contracts/CrowdFund.sol/CrowdFund.json';



const NavBar = () => {
  
  const {wallet,setWallet,chain,setChain,account,setAccount,provider,setProvider,contract,setContract}=useContext(Data);
  
  useEffect(()=>{
    const loadContents=async()=>{
      
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });



      if(accounts.length>0){

        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract=new ethers.Contract('0xA55cdCDe6C159D4daf1308bdc9821fDA48bb4587',Contract.abi,signer);

      
        setAccount(accounts[0]);
        setWallet(true);
        setProvider(provider);
        setContract(contract);
        
      }
    }
    loadContents();
  },[]);
 
  async function connectWallet(){
      
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      
    } catch (error) {
      console.log("error",error);
    }

  }
  

  return (
   <div className='w-screen  z-20 py-5  fixed  bg-slate-900'  >
    <div className=' flex justify-between items-center mx-10  bg-slate-800 text-gray-100 shadow-lg px-10 py-5 bord rounded-lg'>
       <div className=''>
         <Link href="/" ><FaHandsHelping className='text-5xl hover:text-cyan-600'/></Link>
       </div>
       <div className='lg:w-1/4 sm:w-2/4 justify-around flex '>
          <Link href="/" className='tracking-widest hover:bg-cyan-600 px-5 py-2 rounded-md '>HOME</Link>
          <Link href="/create" className='tracking-widest hover:bg-cyan-600 px-5 py-2 rounded-md '>CREATE</Link>
          <Link href="/campaigns" className='tracking-widest hover:bg-cyan-600 px-5 py-2 rounded-md '>CAMPAIGNS</Link>
       </div>
       <div className=''>
           <button className='py-2 px-5 rounded-md shadow-md bg-cyan-600 'onClick={connectWallet} >
            {account=='Connect Wallet'?account:account.slice(0,5)+"..."+account.slice(-5,)}
           </button>
       </div>
    </div>
  </div>
  )
}

export default NavBar