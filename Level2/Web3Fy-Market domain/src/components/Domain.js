import React, { useState,useEffect } from 'react';
import { AiFillEye } from 'react-icons/ai';
import Contract from '../artifacts/contracts/Web3fy.sol/Web3fy.json';
import { ethers } from 'ethers';
import { parseUnits } from 'ethers/lib/utils.js';




const Domain = (props) => {
  const [domains,setDomains]=useState([]);
 useEffect(()=>{
    const loadContents=async()=>{
      let array=[];
      const domain=await props.contract.maxSupply();
      const totDomain=(domain).toNumber();

       

       for(let i=0;i<totDomain;i++){
        const get=await props.contract.getDomain(i+1);
        const getDomain={name:get.name,cost:(ethers.utils.formatEther(get.cost)),ownable:get.isOwned,txHash:get.txHash};

        console.log(getDomain);
        array.push(getDomain);
      }
      setDomains(array); 
    }
    loadContents();
  },[])
  return (
    <div className='my-20 py-10 w-screen px-10'>
      <div className='container mx-auto  grid place-items-center max-w-5xl '>
     
        <h1 className='text-slate-800 font-serif text-center text-4xl'>Here are our registered domain names</h1>
        <p className='text-slate-700 font-mono text-2xl text-center relative top-3 '>After you complete the payment process you will get an NFT, which you will find on Opensea testnet</p>
      </div>
      <div className='container mt-10  mx-auto  grid place-items-center'>

      {domains.map((object,idx)=>{
           
            
              idx+=1
              if(object.ownable==false){
                return(

                        <div className='flex justify-around bg-slate-400 items-center shadow-lg rounded-md px-10 py-5 xl:w-2/5 md:w-2/4 mb-5'>
                            <p className='w-1/3 text-center' style={{fontFamily:'Montserrat, sans-serif',letterSpacing:"2px"}}>{object.name}</p>&nbsp;&nbsp;
                            <p className=' w-1/3 text-center' style={{fontFamily:'Montserrat, sans-serif'}} href=''>{object.cost}&nbsp;ETH</p>&nbsp;&nbsp;
                            <button className='rounded text-center  grid place-content-center px-5 py-2 w-1/3 bg-slate-900 text-gray-300  hover:bg-gray-800' onClick={async()=>{
                              try{
                               const buy=await props.contract.mint(idx,{value:ethers.utils.parseUnits(object.cost,'ether'), gasLimit:10000000});
                              await buy.wait();
                              console.log(buy.hash); 
                              const setHash=await props.contract.addTxHash(idx,buy.hash);
                              console.log(setHash); 
                              window.location.reload();
                            }
                              catch(err){
                                console.log(err);
                              }
                              //await buy.wait();
                              
                            }}>Buy Now</button>
                        </div>
              )}

              else{
                return(
                      <div className='flex justify-around bg-slate-400 items-center shadow-lg rounded-md px-10 py-5 xl:w-2/5 md:w-2/4 my-3'>
                              <p className='w-1/3 text-center' style={{fontFamily:'Montserrat, sans-serif',letterSpacing:"2px"}}>{object.name}</p>&nbsp;&nbsp;
                              <a className='hover:underline w-1/3 text-center' style={{fontFamily:'Montserrat, sans-serif'}} href={'https://mumbai.polygonscan.com/tx/'+object.txHash}>{object.txHash.slice(0,5)+'...'+object.txHash.slice(-5,)}</a>&nbsp;&nbsp;
                              <a href={'https://testnets.opensea.io/assets/mumbai/'+process.env.REACT_APP_CONTRACT+"/"+idx} target='_blank' className='text-3xl w-1/3 grid place-content-center hover:text-gray-800'><AiFillEye/></a>
                      </div>
               )}
            
           
      })}
        

        
        
      </div>
    </div>
  )
}

export default Domain;
