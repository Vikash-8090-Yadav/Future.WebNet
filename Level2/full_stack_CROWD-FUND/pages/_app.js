import '@/styles/globals.css';
import NavBar from '@/components/NavBar';
import Wenb3Modal from "web3modal";
import { ethers } from 'ethers';
import React,{useEffect,useState,useContext,useCallback,createContext} from 'react';


export const Data = React.createContext();

function App({ Component, pageProps }) {
  

  const [wallet,setWallet]=useState(false);
  const [chain,setChain]=useState(false);
  const [provider,setProvider]=useState(null);
  const [account,setAccount]=useState('Connect Wallet');
  const [contract,setContract]=useState();
   
  useEffect(()=>{
    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    }); 

    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });
    
  })

  useEffect(()=>{
   const loadChain=async()=>{
    const chain=await window.ethereum.networkVersion;
    if(chain=='80001'){setChain(true);}
   }
   loadChain();
  });


  return <>
          
          <Data.Provider value={{wallet,setWallet,chain,setChain,account,setAccount,provider,setProvider,contract,setContract}}>
            <NavBar/>
            <Component  {...pageProps} />

          </Data.Provider>
         </>
}
                        
export default App;
