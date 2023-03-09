import React,{useEffect,useContext,useState} from 'react';
import Campaign from '@/components/Campaigns/Campaign';

import { Data } from './_app';
import Web3Modal from "web3modal";
import { ethers } from 'ethers';
import Wallet from '@/components/Wallet';
import Chain from '@/components/Chain';
import axios from 'axios';



const campaigns = () => {

  const [camp,setCamp]=useState([]);
  
  const {wallet,setWallet,chain,setChain,account,setAccount,provider,setProvider,contract,setContract}=useContext(Data);



  useEffect(()=>{
     const loadContents=async()=>{

      if(wallet && chain){

      const noCampaigns=await contract.noCampaigns();
      
      const num=ethers.utils.formatUnits(noCampaigns)*Math.pow(10, 18);
      console.log("No. of campaigns",num);

      let array=[];
      for(let i=1;i<=num;i++){

        const getCampaign=await contract.campaignDetail(i);
        const campaignDetail=await axios(getCampaign.url);
        array.push({image:campaignDetail.data.image,description:campaignDetail.data.description,name:campaignDetail.data.name})

      }
      console.log("The array is ",array);
      setCamp(array);

      
    }

     }
     loadContents();
  },[contract])

  return (
<>
    {!wallet?<Wallet/>:!chain?<Chain/>:<>
    <div className='flex justify-between py-40 px-5 mx-10 text-slate-400'>
      <div className=' h-72 rounded-md shadow-md px-10 py-5 my-8 bg-slate-800' style={{width:"250px",fontFamily:'Montserrat, sans-serif'}}>
          <p>Sort By:</p>
          <ul className='relative top-2 left-3'>
          <li><input type="checkbox"/><span>&nbsp;&nbsp;Date</span></li>

          <li><input type="checkbox"/><span>&nbsp;&nbsp;Fund Need</span></li>
          <li><input type="checkbox"/><span>&nbsp;&nbsp;Ending Soon</span></li>
          </ul>
          <br/>
          <p>Display</p>
          <ul className='relative top-2 left-3'>
          <li><input type="checkbox"/><span>&nbsp;&nbsp;All</span></li>

          <li><input type="checkbox"/><span>&nbsp;&nbsp;Completed</span></li>
          <li><input type="checkbox"/><span>&nbsp;&nbsp;Not Completed</span></li>
          </ul>
      </div>
      <div className='flex flex-wrap justify-evenly '>

        
        {
          camp.map((object,id)=>{
            
            return(
              <div key={id} className=''>
                  <Campaign image={object.image} description={object.description} name={object.name} id={id}/>
              </div>)
})
        }
      </div>
    </div></>}</>
  )
}
/* export const getStaticProps=async()=>{

  let array=[1,2,3,4,5,6,7,8,9,10];

 
  return {props:{array}}

} */

export default campaigns