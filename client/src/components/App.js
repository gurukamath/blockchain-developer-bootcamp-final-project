import React, {useState, useEffect} from 'react';
import TileContainer from './TileContainer.js';
import Footer from './Footer.js';
import '../css/App.css';
import {customizeMethodList} from './MethodListCustom.js';
import {clientInit} from './Client.js';


const contractJSON = require("../contracts/SecretAuction.json");


function App() {

  const [contractMethodList, setContractMethodList] = useState([]);

  useEffect( () => { 
      async function fetchData() {
          try {
              const [web3, contractInstance] =  await clientInit(contractJSON);
              const contractMethodList = await customizeMethodList(contractJSON, contractInstance, web3);
              setContractMethodList(contractMethodList);
          } catch (err) {
              console.log(err);
          }
      }
      fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">Simple Storage Application</header>
      <button onClick={clientInit} className="btn btn-secondary connectClient">Connect Client</button>
      <div className="tileContainer"><TileContainer contractMethodList={contractMethodList}/></div>
      <Footer/>
    </div>
  );
}

export default App;
