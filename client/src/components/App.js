import React, {useState} from 'react';
import TileContainer from './TileContainer.js';
import Footer from './Footer.js';
import '../css/App.css';
import {clientInit, defineNewContractInstance} from './Client.js';
import {findRole} from './utils.js';

const contractJSON = require("../contracts/SecretAuction.json");

let contract;
let web3;
let currRole = '';
let currStage = 0;
let accounts;


function App() {

  const [role, setRole] = useState('');
  const [stage, setStage] = useState(0);


  async function handleClick() {

    web3 = await clientInit();
    contract = await defineNewContractInstance(web3, contractJSON);
    accounts = await web3.currentProvider.request({method: 'eth_requestAccounts'});

    currRole = await findRole(contract, accounts[0])
                    .catch(e => (console.log(e)));

    setRole(currRole);

    currStage = await contract.methods['auctionStage()']().call()

    setStage(currStage);

    web3.currentProvider.on('accountsChanged', async (accounts) => {

      web3 = await clientInit();
      contract = await defineNewContractInstance(web3, contractJSON);
      accounts = await web3.currentProvider.request({method: 'eth_requestAccounts'});
      
      currRole = await findRole(contract, accounts[0]);

      setRole(currRole);

      currStage = await contract.methods['auctionStage()']().call()

      setStage(currStage);

    })

  }


  return (
    <div className="App">
      <header className="App-header">Secret Auction Application</header>
      {role === '' && <button onClick={() => {handleClick()}} className="btn btn-secondary connectClient">Connect Client</button>}
      {role === 'AuctionOwner' && stage === '0' && <div className="tileContainer"><TileContainer web3={web3} contract={contract} handleClick={handleClick} role={role} stage={stage}/></div>}
      {role === 'AuctionOwner' && stage === '1' && <div className="tileContainer"><TileContainer web3={web3} contract={contract} handleClick={handleClick} role={role} stage={stage}/></div>}
      {role === 'AuctionOwner' && stage === '2' && <div className="tileContainer"><TileContainer web3={web3} contract={contract} handleClick={handleClick} role={role} stage={stage}/></div>}
      
      {role === 'AuctionParticipant'  && stage === '1' && <div className="tileContainer"><TileContainer web3={web3} contract={contract} handleClick={handleClick} role={role} stage={stage}/></div>}
      {role === 'AuctionParticipant'  && stage === '2' && <div className="tileContainer"><TileContainer web3={web3} contract={contract} handleClick={handleClick} role={role} stage={stage}/></div>}
      <Footer/>
    </div>
  );
}

export default App;
