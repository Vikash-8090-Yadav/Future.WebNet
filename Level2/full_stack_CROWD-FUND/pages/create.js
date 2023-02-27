import React,{useCallback, useState,useContext,useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import Image from 'next/image';
import Img from "../images/crowdFund.jpg";

import FormData from 'form-data';
import axios from 'axios';
import { Data } from './_app';
import Wallet from '@/components/Wallet';
import Chain from '@/components/Chain';
import { ethers } from 'ethers';

const create = () => {

  const {wallet,setWallet,chain,setChain,account,setAccount,provider,setProvider,contract,setContract}=useContext(Data);
  const formData=new FormData();
  
  function toWei(amt){
    return(ethers.utils.parseUnits(amt.toString(),'ether'));
  }
  
  
  const [image,setImage]=useState(Img);
  const [file,setFile]=useState();
  const [metaData,setMetaData]=useState({name:"",description:"",target:"",amtNft:""});

/*   useEffect(()=>{
    const loadContents=async()=>{

     const accounts = await window.ethereum.request({
       method: "eth_accounts",
     });


     if(provider && chain){

     const noCampaigns=await contract.hello();
     console.log("No of campaign",noCampaigns);
    }

    }
    loadContents();
 },[contract]) */


  const onDrop=useCallback( async(acceptedFiles)=>{

     setImage(URL.createObjectURL( acceptedFiles[0]));
     setFile(acceptedFiles[0]);
     
  },[])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop
})
  
  const sendData=async()=>{

    formData.append("file",file);
    console.log("The Image",formData);
    try{
        const sendImage=await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS",formData,{
          headers: {
              'pinata_api_key': process.env.REACT_APP_PINATA_KEY,
              'pinata_secret_api_key': process.env.REACT_APP_PINATA_SECRET_KEY,
              
              "Content-Type": "multipart/form-data"
          },
        });
        console.log("Image uploaded");
        const imgHash=await sendImage.data.IpfsHash;
        const sendMetaData=await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS",{"name":metaData.name,"description":metaData.description,"image":`https://ipfs.io/ipfs/${imgHash}`},{
          headers: {
              'pinata_api_key': process.env.REACT_APP_PINATA_KEY,
              'pinata_secret_api_key': process.env.REACT_APP_PINATA_SECRET_KEY,
              
              "Content-Type": "application/json"
          },
        });
        console.log("JSON uploaded");
        const metaHash=await sendMetaData.data.IpfsHash;
        console.log("The meta Data",metaHash);
        const createCampaign=await contract.createCampaign(`https://ipfs.io/ipfs/${metaHash}`,metaData.name,toWei( metaData.target),toWei( metaData.amtNft));
        console.log("The new Campaign request ",createCampaign);

    }
    catch(err){console.log(err);}
}
  return (
    
    <>
      {!wallet?<Wallet/>:!chain?<Chain/>:<>
        
        <div className=' mx-20 py-40 px-5 flex flex-row justify-between flex-wrap items-start bg-slate-900 text-slate-400 overflow-y-hidden'>
        <div className='my-2 text-center' {...getRootProps()}>
            <input {...getInputProps()}/>
            <Image src={image} className='w-80 h-80 rounded-md my-5' width={100} height={100} alt="Uploaded Image"/>
            <b className='text-xl text-slate-600 text-center'>Upload the Image</b>
        </div>
        
        <div className='w-3/5 text-lg text-slate-600' style={{fontFamily: "Quicksand, sans-serif"}}>
           <div className=''>
              <b className='text-xl '>Campaign Name</b>
              <input type="text" placeholder="Name of campaign" className='my-2 w-full px-5 py-2 border-solid border-2 outline-none rounded-md' onChange={(event)=>{
                setMetaData({...metaData,["name"]:event.target.value})
              }}/>
           </div>
           <div className=''>
              <b className='text-xl'>Description</b>
              <textarea rows="5" className='w-full my-2 px-5 py-2 border-dotted border-2 outline-none rounded-md' placeholder='Give details of your campign' onChange={(event)=>{
                setMetaData({...metaData,["description"]:event.target.value})
              }}/>
           </div>
           <div className='flex justify-between flex-row'>

              <div className='flex flex-col w-1/2 mx-1'>
                <b className='text-xl'>Target Amount</b>
                <input type="text" placeholder="Target Amount" className='rounded-md my-2 w-full px-5 py-2 border-solid border-2 outline-none'onChange={(event)=>{
                setMetaData({...metaData,["target"]:event.target.value})
              }}/>    
              </div>
              <div className='flex flex-col w-1/2 mx-1'>
                <b className='text-xl'>NFT Value</b>
                <input type="text" placeholder="Value above which NFT will be issued" className='my-2 rounded-md w-full px-5 py-2 border-solid border-2 outline-none' onChange={(event)=>{
                setMetaData({...metaData,["amtNft"]:event.target.value})}}/>
              </div>
           </div>
           <button className='text-center px-5 py-2 text-gray-200 bg-slate-500 w-1/3 mt-5 rounded-md shadow-md' onClick={sendData}>UPLOAD</button>
        </div>
        

    </div>
          
        </>}
    </>


  )
}

export default create