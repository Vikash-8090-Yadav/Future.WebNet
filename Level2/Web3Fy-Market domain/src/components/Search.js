import React from 'react';
import Gif from '../images/assest.gif';

const Search = () => {
  return (
    
     <div className=' search w-screen    py-10 shadow-lg relative top-16 '  style={{backgroundColor:'rgb(52, 51, 51)'}}>
        <div className='container mx-auto px-20  flex justify-between   items-center place-content-center'>
          <div className='top-96 lg:w-2/5 md:w-1/2  text-slate-400'>
            <h1 className='lg:text-5xl md:text-2xl font-serif'><b>It all begins with a domain name.</b></h1>
            <p className='font-mono text-2xl relative top-5'>Register your website with our domain and get a exclusive NFT build with your address and domain😋</p>

          </div>
          <div className='top-96'>
              <img src={Gif} className='lg:max-w-sm  '/>
          </div>
        </div>

     </div>
  )
}

export default Search;