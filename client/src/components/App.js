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
let accounts;

function App() {
  const [web3Provider, setWeb3Provider] = useState("");
  const [deployedAuctionAddresses, setDeployedAuctionAddresses] = useState([]);
  const [contract, setContract] = useState("");
  const [role, setRole] = useState("");
  const [stage, setStage] = useState(0);

  useEffect(() => {
    async function fetchData() {
      if (web3Provider.currentProvider) {
        accounts = await web3Provider.currentProvider.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);

        if (contract) {
          currRole = await findRole(contract, accounts[0]).catch((e) =>
            console.log(e)
          );

          setRole(currRole);

          currStage = await contract.methods["auctionStage()"]().call();

          setStage(currStage);
        }
      }
    }
    fetchData();
  }, [web3Provider, contract]);

  async function providerConnect() {
    const web3 = await clientInit();
    setWeb3Provider(web3);
    factory = await defineNewContractInstance(web3, factoryJSON);
    accounts = await web3.currentProvider.request({
      method: "eth_requestAccounts",
    });

    const deployedAuctionList = await factory.getPastEvents("ContractCreated", {
      fromBlock: 0,
      toBlock: "latest",
    });
    const addressList = deployedAuctionList.map((v) => {
      return v["returnValues"]["newAddress"];
    });
    setDeployedAuctionAddresses(addressList);

    // web3Provider.currentProvider.on("accountsChanged", async (accounts) => {
    //   // web3 = await clientInit();
    //   // contract = await defineNewContractInstance(web3Provider, contractJSON);
    //   accounts = await web3Provider.currentProvider.request({
    //     method: "eth_requestAccounts",
    //   });

    //   currRole = await findRole(contract, accounts[0]);

    //   setRole(currRole);

    //   currStage = await contract.methods["auctionStage()"]().call();

    //   setStage(currStage);
    // });
  }

  async function createNewAuction() {
    console.log("new contract creation started");
    factory = await defineNewContractInstance(web3Provider, factoryJSON);
    accounts = await web3Provider.currentProvider.request({
      method: "eth_requestAccounts",
    });
    const newContractReceipt = await factory.methods["createAuction()"]()
      .send()
      .catch((e) => {
        console.log(e);
      });
    const newContractAddress =
      newContractReceipt["events"]["ContractCreated"]["returnValues"][
        "newAddress"
      ];
    const newContract = new web3Provider.eth.Contract(
      contractJSON.abi,
      newContractAddress
    );

    setContract(newContract);
  }

  async function handleClick() {
    // web3 = await clientInit();
    // const auction = await defineNewContractInstance(web3Provider, contractJSON);
    // setContract(auction);
    // accounts = await web3Provider.currentProvider.request({
    //   method: "eth_requestAccounts",
    // });
    // currRole = await findRole(contract, accounts[0]).catch((e) =>
    //   console.log(e)
    // );
    // setRole(currRole);
    // currStage = await contract.methods["auctionStage()"]().call();
    // setStage(currStage);
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
          <AuctionSelector
            deployedAuctionAddresses={deployedAuctionAddresses}
          />
        </div>
      )}
      {contract && role === "AuctionOwner" && stage === "0" && (
        <div className="tileContainer">
          <TileContainer
            web3={web3Provider}
            contract={contract}
            accounts={accounts}
            handleClick={handleClick}
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
            handleClick={handleClick}
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
            handleClick={handleClick}
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
            handleClick={handleClick}
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
            handleClick={handleClick}
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
