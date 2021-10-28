import React, {useState} from 'react';
import TileContainer from './TileContainer.js';
import Footer from './Footer.js';
import '../css/App.css';
import {clientInit, defineNewContractInstance} from './Client.js';
const contractJSON = require("../contracts/SecretAuction.json");



function App() {

  const [display, setDisplay] = useState(<button onClick={onClick} className="btn btn-secondary connectClient">Connect Client</button>);


  let contract;
  let web3;

  async function onClick() {
    web3 = await clientInit();
    contract = await defineNewContractInstance(web3, contractJSON);

    setDisplay(<div className="tileContainer"><TileContainer web3={web3} contract={contract}/></div>)
  }

  return (
    <div className="App">
      <header className="App-header">Simple Storage Application</header>
      {display}
      <Footer/>
    </div>
  );
}

export default App;
