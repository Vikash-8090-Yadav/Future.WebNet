import React from 'react'
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Metamask from '../images/metamask.png';
// ABIs
import Contract from '../artifacts/contracts/Web3fy.sol/Web3fy.json';

const Wallet = (props) => {

    const [account,setAccount]=useState(null);

    const [contract,setContract]=useState(null);
    const [provider,setProvider]=useState(null);

    const [chain,setChain]=useState(false);

    useEffect(()=>{

        const loadContents=async()=>{

          let provider;
          if(window.ethereum){
              provider=window.ethereum;
                try{
                  await provider.enable();}
             
                catch(err){
                  console.log(err);
                }
          }

          const web3 = new ethers.providers.Web3Provider(provider);
          const signer = web3.getSigner();
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
  
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  
          const ethDaddy = new ethers.Contract(process.env.REACT_APP_CONTRACT, Contract.abi, signer);

          
         
          const account = ethers.utils.getAddress(accounts[0]);
          console.log(account);

          setProvider(web3);
          setContract(ethDaddy);
          setAccount(account);
          //setChain(chainId);



        }
        loadContents();

    });
    useEffect(()=>{
        props.getData({account,contract,provider});
    },[account,contract,provider])
            
  
  return (
    <div className='h-screen w-screen place-content-center grid bg-slate-700'>
      <div className='box max-w-sm rounded-md shadow-lg px-10 py-5 bg-slate-600  place-items-center grid'>
           <img src={Metamask} width="50px" style={{cursor:'pointer'}} className="text-center"/>
           <h1 className='text-center text-2xl text-zinc-300 mt-3' style={{fontFamily:'Montserrat, sans-serif'}}>Connect your Metamask wallet to continue...</h1>
           
      </div>
    </div>
  )
}

export default Wallet