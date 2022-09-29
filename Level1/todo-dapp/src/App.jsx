import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import './App.css';
import Manager from "./artifacts/contracts/Manager.sol/Manager.json";
import secrets from "./secrets.json";

function App() {

  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [tickets, setTickets] = useState([]);

  const initConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      setAccount(accounts[0]);
      setContract(
        new ethers.Contract(
          secrets['contract-address'],
          Manager.abi,
          signer
        )
      );
    }
    else {
      console.log("Please Install Metamask");
    }
  }

  useEffect(() => {
    initConnection();
  }, []);

  const getAllTickets = async () => {
    let result = await contract.getTickets();
    console.log(result);
    setTickets(result);
  };

  const createTicket = async (_name) => {
    let result = await contract.createTicket(_name);
    await result.wait();
    getAllTickets();
  }

  const updateStatus = async (_index, _status) => {
    const transaction = await contract.updateStatus(_index, _status);
    await transaction.wait();
    getAllTickets();
  }

  const renameTickets = async (_index) => {
    let newName = prompt("Please enter new ticket name", "");
    const transaction = await contract.updateTicketName(_index, newName);
    await transaction.wait();
    getAllTickets();
  }

  return (
    <div className='page'>
      <div className="header">
        <p>Todo List</p>
        {account !== "" ? <p>{`${account.slice(0, 5)}...${account.slice(38, 44)}`}</p> : <button className='big_button' onClick={initConnection}>Connect to App</button>}
      </div>

      <div className="input-section">
        <div>
          <button className='big_button' onClick={() => createTicket(name)}>
            Create Todo
          </button>
          <input type="text" className="input" onChange={(e) => { setName(e.target.value) }} placeholder="Ticket Name" />
        </div>
        <button className='big_button' onClick={() => getAllTickets()}>
          Load Todo
        </button>
      </div>

      <div className="main">
        <div className="main_col" style={{ backgroundColor: "blueviolet" }}>
          <div className="main_col_heading">Todo</div>
          {tickets
            .map((t, i) => ({ id: i, item: t }))
            .filter((t) => t.item.status === 0)
            .map((ticket, index) => {
              return (
                <div className="main_ticket_card">
                  <p className="main_ticket_card_id">#{ticket.id}</p>
                  <p key={index}>{ticket.item.name}</p>
                  <div className="main_ticket_button_section">
                    <button className="small_button" style={{ backgroundColor: 'lightblue' }} onClick={() => { updateStatus(ticket.id, 1) }}>Busy</button>

                    <button className="small_button" style={{ backgroundColor: 'lightgreen' }} onClick={() => { updateStatus(ticket.id, 2) }}>Done</button>

                    <button className="small_button" style={{ backgroundColor: 'lightgray' }} onClick={() => { renameTickets(ticket.id) }}>Rename</button>

                  </div>
                </div>
              );
            }
            )}
        </div >

        <div className="main_col" style={{ backgroundColor: "gray" }}>
          <div className="main_col_heading">Busy</div>
          {tickets
            .map((t, i) => ({ id: i, item: t }))
            .filter((t) => t.item.status === 1)
            .map((ticket, index) => {
              return (
                <div className="main_ticket_card">
                  <p className="main_ticket_card_id">#{ticket.id}</p>
                  <p key={index}>{ticket.item.name}</p>
                  <div className="main_ticket_button_section">
                    <button className="small_button" style={{ backgroundColor: 'lightblue' }} onClick={() => { updateStatus(ticket.id, 0) }}>Todo</button>

                    <button className="small_button" style={{ backgroundColor: 'lightgreen' }} onClick={() => { updateStatus(ticket.id, 2) }}>Done</button>

                    <button className="small_button" style={{ backgroundColor: 'lightgray' }} onClick={() => { renameTickets(ticket.id) }}>Rename</button>

                  </div>
                </div>
              )
            }
            )}
        </div>

        <div className="main_col" style={{ backgroundColor: "green" }}>
          <div className="main_col_heading">Done</div>
          {tickets
            .map((t, i) => ({ id: i, item: t }))
            .filter((t) => t.item.status === 2)
            .map((ticket, index) => {
              return (
                <div className="main_ticket_card">
                  <p className="main_ticket_card_id">#{ticket.id}</p>
                  <p key={index}>{ticket.item.name}</p>
                  <div className="main_ticket_button_section">
                    <button className="small_button" style={{ backgroundColor: 'lightblue' }} onClick={() => { updateStatus(ticket.id, 0) }}>Todo</button>

                    <button className="small_button" style={{ backgroundColor: 'lightgreen' }} onClick={() => { updateStatus(ticket.id, 1) }}>Busy</button>

                    <button className="small_button" style={{ backgroundColor: 'lightgray' }} onClick={() => { renameTickets(ticket.id) }}>Rename</button>

                  </div>
                </div>
              );
            }
            )}
        </div>
      </div >
    </div >
  );
}

export default App;
