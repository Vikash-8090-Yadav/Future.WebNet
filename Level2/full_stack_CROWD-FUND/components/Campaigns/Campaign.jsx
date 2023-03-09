import React,{useEffect, useState,useContext} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Data } from '@/pages/_app';

const Campaign = ({image,description,name,id}) => {
  const {wallet,setWallet,chain,setChain,account,setAccount,provider,setProvider,contract,setContract}=useContext(Data);

  const [state,setState]=useState(false);
  useEffect(()=>{
     const loadContents=async()=>{
        const get=await contract.campaignDetail(id+1);
        console.log(get.isAchieved);
        if(get.isAchieved){
          
          setState(true);
        }
     }
     loadContents();

  },[]);

  
  return (
    <div>
        <div className='rounded-lg shadow-md  bg-slate-800 text-slate-400 w-72 h-96 px-5 pt-10 pb-5 my-5 mx-5 flex text-center  flex-col justify-items-center' >
            <div className=' justify-center  px-2 py-2   flex object-contain'> <img src={image} className='object-contain w-40 h-40' alt='Image Here'/></div>
            <h1 className='text-xl my-2' style={{fontFamily:'Montserrat, sans-serif'}}>{name}</h1>
            <p className='font-mono text-sm '>{description}</p>
            <button className='rounded-md px-5 py-2 bg-cyan-600 text-white mx-5 my-2' ><Link style={{fontFamily:'Montserrat, sans-serif'}}
            href={{
                pathname: "/campaign/"+name,
                query: { id: id }
              }}>{state?"Completed🎉":"Contribute🤍"}</Link></button>
        </div>
    </div>
  )
}

export default Campaign