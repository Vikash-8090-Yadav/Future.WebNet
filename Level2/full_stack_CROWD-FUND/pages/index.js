import Image from "next/image";

import B1 from "../images/crowdFund.jpg";

export default function Home() {
  return (
    <>
      <div className="pt-32 bg-slate-900 " style={{height:"100vh"}}>
          <div className=" mx-20 text-slate-400 rounded-lg shadow-md overflow-y-scroll px-10 py-10  items-center bg-slate-800 " style={{height:"77vh"}}>
            <div className='container mx-auto px-20  flex justify-between   items-center place-content-center top-24 relative'>
            <div className=' lg:w-2/5 md:w-1/2  '>
              <h1 className='lg:text-5xl md:text-2xl font-serif'><b>It all begins with a small help...</b></h1>
              <p className='font-mono text-2xl relative top-5'>Contribute with some ETH, and help in the growth and the development of campaign 🤝</p>

            </div>
            <div className=''>
                <Image src={B1} className='lg:max-w-sm  '/>
            </div>
          </div>
          
          </div>
          
      </div>
    </>
  );
}
