import React from 'react'
import { useEffect } from 'react';
import { ethers } from 'ethers';
import Polygon from '../images/polygon.png';


const Chain = (props) => {
  useEffect(()=>{
    async function loadContents(){
        const provider=await window.ethereum;

        const web3 = new ethers.providers.Web3Provider(provider);
        //console.log(web3.provider.networkVersio);
        const networkId=await web3.provider.networkVersion;
        if(networkId=='80001'){
            props.getChain(true)
        }
        else{
            props.getChain(false);
        }
    }
    loadContents();})
  return (
    <div className='h-screen w-screen place-content-center grid bg-slate-700'>
    <div className='box max-w-sm  rounded-md shadow-lg px-10 py-5 bg-slate-600  place-items-center grid'>
         <img src={Polygon} width="50px" style={{cursor:'pointer'}} className="text-center"/>
         <h1 className='text-center text-2xl text-zinc-300 mt-3' style={{fontFamily:'Montserrat, sans-serif'}}>Switch to Mumbai Testnet</h1>
         
    </div>
  </div>
  )
}

export default Chain