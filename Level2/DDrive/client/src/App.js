import './App.css';
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import {useState,useEffect} from "react";
import {ethers} from "ethers";
import FileUpload from "./components/FileUpload.js";
import Display from "./components/Display.js";
import Modal from "./components/Modal.js"

function App() {
  const [account,setAccount] = useState("");
  const [contract,setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen,setModalOpen] = useState(false);

  useEffect(()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider = async ()=>{
      if(provider){

        // below is a special script that i am not familliar with which helps to dynamically update data on change of metamask accounts
        // tumne chain change ki to ye change hoga
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        //Aur agar account change kiya to ye change hoga dynamically
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        })
        // Bas idhar tak hi tha

        await provider.send("eth_requestAccounts",[]);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setProvider(provider);

        let contracAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const contract = new ethers.Contract(contracAddress,Upload.abi,signer);
        setContract(contract);

        console.log(contract);
      }else{
        console.log("MetaMak has not paired");
      }
    }
    provider && loadProvider();
  },[]);
  

  return (
    <>
      {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}

      <div className="App">
        <h1 style={{ color: "white" }}>DevsDrive</h1>
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>

        <p style={{ color: "white" }}>
          Account : {account ? account : "Not connected"}
        </p>
        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>
        <Display contract={contract} account={account}></Display>
      </div>
    </>
  );
}

export default App;
