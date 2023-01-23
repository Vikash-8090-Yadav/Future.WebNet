import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'
import { collection,addDoc } from "@firebase/firestore";
import {app,db} from './Firebaseconfig.js';
import Web3Token from 'web3-token';
import { useCookies } from 'react-cookie';
import {Routes,Route}  from 'react-router-dom';


// Components
import Navigation from './components/Navigation'
import Search from './components/Search'
import Domain from './components/Domain';
import Chain from './components/Chain';
import Wallet from './components/Wallet';


// ABIs
import Contract from './artifacts/contracts/Web3fy.sol/Web3fy.json';


function App() {
  
  //const reference=collection(db,'web3-users');
  const [balances, setBalances] = useState({});
  //const [cookies, setCookie] = useCookies(['Web3fy']);
  const [wallet,setWallet]=useState(false);

  const [contract,setContract]=useState(null);
  const [state,setState]=useState(0);
  const [provider,setProvider]=useState(0);
  const [account,setAccount]=useState(null);

  const [chain,setChain]=useState(false);

  
  async function getData(data){
    const {account,contract,provider}=data;
    //console.log(provider._network.chainId);

    if(account){setWallet(true);}
    setProvider(provider);
          setContract(contract);
          setAccount(account);
    

  } 
  async function getChain(data){
    
      setChain(data)
    
  }  

        




  return (
    <>
    {/* <div className='grid place-content-center bg-slate-500 w-screen h-screen bg-no-repeat bg-center bg-cover bg-fixed' style={{backgroundImage:`url(${Image})`}}>
       <h1 className='  text-4xl text-fuchsia-200'><b>Hello from Kaushan Dutta</b></h1>
      
      
      {/* <button onClick={()=>{
         if(state==0){
          setState(1);}
         else{setState(0)}
      }}>Click Me</button>
      {state==1?<Domain change={Change}/>:''} 
       <div>
        <h3>Wallet: {balances.address}</h3>
        <h3>Native Balance: {balances.nativeBalance} ETH</h3>
        <h3>Token Balances: {balances.tokenBalances}</h3>
      </div> 

    </div>
    <div className='w-full flex '>
       <div className='bg-red-600 w-1/2 text-center'>Red</div>
       <div className='bg-pink-400 w-1/2 text-center'>Pink</div>
    </div>
    <div className='w-screen h-screen bg-green-50 place-content-center py-10'>
          <h1 className=' text-center text-cyan-800 text-4xl capitalize'><b>Our Services</b></h1>
          <hr className=' w-1/5   mx-auto  '/>

          <div className='cards py-10 my-10 place-items-center bg-orange-300 grid  sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 lg-gap-3 justify-items-center'>

              <div className='rounded overflow-hidden shadow-lg max-w-sm bg-lime-200'>
                <img src={Image} className="w-full"/>
                <div className='px-6 py-6'>
                  <div className='font-bold text-xl mb-2'>
                    Technical Aspect
                  </div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutatibus quia, mullal et perferendis eaqueu, exercitationem praasesentium</p>
                  <div className='grid grid-flow-col gap-5 pb-2 mt-5 pr-9'>
                    <span className='bg-gray-400 rounded-full px-3 py-1 text-sm text-center' >Photography</span>
                    <span  className='bg-gray-400 rounded-full px-3 py-1 text-sm text-center' >Winter</span>
                    <span className='bg-gray-400 rounded-full px-3 py-1 text-sm text-center' >Summer</span>
                  </div>
                </div>
              </div>
              <div className='rounded overflow-hidden shadow-lg max-w-sm bg-lime-200'>
                <img src={Image} className="w-full"/>
                <div className='px-6 py-6'>
                  <div className='font-bold text-xl mb-2'>
                    Technical Aspect
                  </div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutatibus quia, mullal et perferendis eaqueu, exercitationem praasesentium</p>
                  <div className='grid grid-flow-col gap-5 pb-2 mt-5 pr-9'>
                    <span className='bg-gray-400 rounded-full px-3 py-1 text-sm text-center' >Photography</span>
                    <span  className='bg-gray-400 rounded-full px-3 py-1 text-sm text-center' >Winter</span>
                    <span className='bg-gray-400 rounded-full px-3 py-1 text-sm text-center' >Summer</span>
                  </div>
                </div>
              </div> 
              <div className='rounded overflow-hidden shadow-lg max-w-sm bg-lime-200'>
                <img src={Image} className="w-full"/>
                <div className='px-6 py-6'>
                  <div className='font-bold text-xl mb-2'>
                    Technical Aspect
                  </div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutatibus quia, mullal et perferendis eaqueu, exercitationem praasesentium</p>
                  <div className='grid grid-flow-col gap-5 pb-2 mt-5 pr-9'>
                    <span className='bg-gray-400 rounded-full px-3 py-1 text-sm text-center' >Photography</span>
                    <span  className='bg-gray-400 rounded-full px-3 py-1 text-sm text-center' >Winter</span>
                    <span className='bg-gray-400 rounded-full px-3 py-1 text-sm text-center' >Summer</span>
                  </div>
                </div>
              </div>
          </div>
    </div> */}
    {
      wallet==false?<Wallet getData={getData}/>:chain==false?<Chain getChain={getChain} provider={provider}/>:<>
        <Routes>
          <Route path="/" element={<><Navigation  account={account}/><Search/><Domain account={account}  provider={provider} contract={contract} /></>} />
          <Route path="/search" element={<><Search/></>} />
          <Route path="/navigation" element={<><Navigation/></>} />
        </Routes>
      </>
    }


    </>
  );
}


export default App;