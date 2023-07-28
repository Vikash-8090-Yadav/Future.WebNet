import WrongNetworkMessage from '../components/WrongNetworkMessage'
import ConnectWalletButton from '../components/ConnectWalletButton'
import TodoList from '../components/TodoList'
import { TaskContractAddress } from '../config.js'
import TaskAbi from  '../../backend/build/contracts/TaskContract.json'
import {ethers} from 'ethers'
import {useState} from 'react'

/* 
const tasks = [
  { id: 0, taskText: 'clean', isDeleted: false }, 
  { id: 1, taskText: 'food', isDeleted: false }, 
  { id: 2, taskText: 'water', isDeleted: true }
]
*/

export default function Home() {
  const [correctNetwork,setCorrectNetwork]= useState(false)
  const [isUserLoggedIn, setIsUserLoggedIn]=useState(false)
  const [currentAccount, setCurrentAccount]= useState('')
  const [input,setInput]=useState('')
  const [tasks,setTasks]=useState([])

  const connectWallet = async () => {
    try {
      const{ethereum} = window
      if (!ethereum) {
        console.log('Metamask not detected')
        return

    } 
    let chainId=await ethereum.request({method:'eth_chainId'})
   console.log('connected to chain:', chainId)
    const sepoliaChainId='0xaa36a7'
    if (chainId!==sepoliaChainId) {
      alert('you are not connected to the rinkeby testnet!')
      setCorrectNetwork(false)
      return

    } else {
      setCorrectNetwork(true)

    }

    const accounts= await ethereum.request({method:'eth_requestAccounts'})
    console.log('Found account',accounts[0])
    setIsUserLoggedIn(true)
    setCurrentAccount(accounts[0])

  }  catch(error) {
      console.log(error)
    }

  }
  const getAllTasks = async () => {
  
  }
  const addTask = async e => {
    e.preventDefault()

    let task = {
      taskText: input,
      isDeleted:false
    }
    
    try {
      const {ethereum}=window
      if (ethereum) {
        const provider=new ethers.providers.Web3Provider(ethereum)
        const signer=provider.getSigner()
        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        )
        TaskContract.addTask(task.taskText,task.isDeleted)
        .then(res => {
          setTasks([...tasks,task])
          console.log('Added task')
        })
        .catch(err => {
          console.warn(err)
        })
      } else {
        console.log('ethereum object does not exist')
      }

    } catch (error){
      console.log(error)
    }
  }

  const deleteTask = key => async () => {

  }

  return (
    <div className='bg-[#FFF0D6] h-screen w-screen flex justify-center py-6'>
      {!isUserLoggedIn ? (
        <ConnectWalletButton connectWallet={connectWallet} />
      ) : correctNetwork ? (
        <TodoList input={input} setInput={setInput} addTask={addTask} />
      ) : (
        <WrongNetworkMessage />
      )}
    </div>
  );
  
}

