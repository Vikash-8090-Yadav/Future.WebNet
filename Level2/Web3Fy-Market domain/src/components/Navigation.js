import React from 'react';
import { SiEthereum } from 'react-icons/si';

const Navigation = (props) => {
  return (
    
    <div className='w-screen  z-20 py-5 shadow-lg fixed  ' style={{backgroundColor:'rgb(52, 50, 50)'}} >
      <div className='container mx-auto px-10 flex justify-between items-center'>
        <div className='flex items-center text-xl text-gray-300'>
            <SiEthereum className='text-2xl'/><span style={{fontFamily:'Montserrat, sans-serif',letterSpacing:"2px"}}>Web3Fy</span> 
        </div>
        <div className='account'>
            <span className='border-solid text-gray-300 border-4 px-5 py-2 rounded-md' style={{fontFamily:'Montserrat, sans-serif'}}>{props.account.slice(0,5)+'...'+props.account.slice(-5,)}</span>
        </div>
      </div>
    </div>
  )
}

export default Navigation