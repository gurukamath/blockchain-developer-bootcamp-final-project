import React, { useEffect, useState } from "react";
import TileContainer from "./TileContainer.js";
import AuctionSelector from "./AuctionSelector.js";
import AuctionCreator from "./AuctionCreator.js";
import Footer from "./Footer.js";
import "../css/App.css";
import { clientInit, defineNewContractInstance } from "./Client.js";
import { findRole } from "./utils.js";

const contractJSON = require("../contracts/SecretAuction.json");
const factoryJSON = require("../contracts/AuctionFactory.json");

// let contract;
// let web3;
let factory;
let currRole = "";
let currStage = 0;
let currAccounts;

function App() {
  const [web3Provider, setWeb3Provider] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [deployedAuctionAddresses, setDeployedAuctionAddresses] = useState([]);
  const [contract, setContract] = useState("");
  const [role, setRole] = useState("");
  const [stage, setStage] = useState(0);

  useEffect(() => {
    async function fetchData() {
      if (web3Provider.currentProvider) {
        currAccounts = await web3Provider.currentProvider.request({
          method: "eth_requestAccounts",
        });
        setAccounts(currAccounts);

        web3Provider.currentProvider.on("accountsChanged", async (accounts) => {
          currAccounts = await web3Provider.currentProvider.request({
            method: "eth_requestAccounts",
          });
          setAccounts(currAccounts);
        });
      }
    }
    fetchData();
  }, [web3Provider]);

  useEffect(() => {
    async function fetchData() {
      if (contract) {
        currRole = await findRole(contract, accounts[0]).catch((e) =>
          console.log(e)
        );

        setRole(currRole);

        currStage = await contract.methods["auctionStage()"]().call();

        setStage(currStage);
      }
    }

    fetchData();
  }, [contract, accounts]);

  async function providerConnect() {
    const web3 = await clientInit();
    setWeb3Provider(web3);
    factory = await defineNewContractInstance(web3, factoryJSON);

    const deployedAuctionList = await factory.getPastEvents("ContractCreated", {
      fromBlock: 0,
      toBlock: "latest",
    });
    console.log(deployedAuctionList);
    const addressList = deployedAuctionList.map((v) => {
      console.log(v["returnValues"]);
      return v["returnValues"];
      // return v["returnValues"]["newAddress"];
    });
    console.log(addressList);
    setDeployedAuctionAddresses(addressList);
  }

  async function createNewAuction(name, desc) {
    factory = await defineNewContractInstance(web3Provider, factoryJSON);
    console.log(factory.methods["createAuction(string,string)"]);

    const receipt = await factory.methods["createAuction(string,string)"](
      name.toString(),
      desc.toString()
    ).send({ from: accounts[0] });
    // .catch((e) => {
    //   console.log(e);
    // });
    console.log(receipt);
    const newContractAddress =
      receipt["events"]["ContractCreated"]["returnValues"]["newAddress"];
    const newContract = new web3Provider.eth.Contract(
      contractJSON.abi,
      newContractAddress
    );

    console.log(newContract);

    setContract(newContract);
  }

  async function selectAuction(auctionAddress) {
    const newContract = new web3Provider.eth.Contract(
      contractJSON.abi,
      auctionAddress
    );

    setContract(newContract);
  }

  return (
    <div className="App">
      <header className="App-header">Secret Auction Application</header>
      {!web3Provider && !contract && (
        <button
          onClick={() => {
            providerConnect();
          }}
          className="btn btn-secondary connectClient"
        >
          Connect Client
        </button>
      )}
      {web3Provider && !contract && (
        <div>
          <AuctionCreator createNewAuction={createNewAuction} />
          {deployedAuctionAddresses.length !== 0 && (
            <AuctionSelector
              deployedAuctionAddresses={deployedAuctionAddresses}
              selectAuction={selectAuction}
            />
          )}
        </div>
      )}
      {contract && role === "AuctionOwner" && stage === "0" && (
        <div className="tileContainer">
          <TileContainer
            web3={web3Provider}
            contract={contract}
            accounts={accounts}
            // handleClick={handleClick}
            role={role}
            stage={stage}
          />
        </div>
      )}
      {contract && role === "AuctionOwner" && stage === "1" && (
        <div className="tileContainer">
          <TileContainer
            web3={web3Provider}
            contract={contract}
            accounts={accounts}
            // handleClick={handleClick}
            role={role}
            stage={stage}
          />
        </div>
      )}
      {contract && role === "AuctionOwner" && stage === "2" && (
        <div className="tileContainer">
          <TileContainer
            web3={web3Provider}
            contract={contract}
            accounts={accounts}
            // handleClick={handleClick}
            role={role}
            stage={stage}
          />
        </div>
      )}

      {contract && role === "AuctionParticipant" && stage === "1" && (
        <div className="tileContainer">
          <TileContainer
            web3={web3Provider}
            contract={contract}
            accounts={accounts}
            // handleClick={handleClick}
            role={role}
            stage={stage}
          />
        </div>
      )}
      {contract && role === "AuctionParticipant" && stage === "2" && (
        <div className="tileContainer">
          <TileContainer
            web3={web3Provider}
            contract={contract}
            accounts={accounts}
            // handleClick={handleClick}
            role={role}
            stage={stage}
          />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
