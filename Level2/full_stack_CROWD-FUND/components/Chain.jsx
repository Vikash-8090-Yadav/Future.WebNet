import React from 'react';
import Polygon from '../images/polygon.png';
import Image from 'next/image';

const Chain = () => {
  return (
    <div className=' w-screen  h-screen pb-5 pt-32 '>
      <div className='place-content-center grid bg-slate-700  mx-20 rounded-md h-full shadow-md'>
      <div className=' max-w-sm  rounded-md shadow-lg px-10 py-5 bg-slate-600  place-items-center grid'>
          <Image src={Polygon} width="50px" style={{cursor:'pointer'}} className="text-center"/>
          <h1 className='text-center text-2xl text-zinc-300 mt-3' style={{fontFamily:'Montserrat, sans-serif'}}>Switch to Mumbai Testnet</h1>
          
      </div>
    </div>
  </div>
  )
}

export default Chain