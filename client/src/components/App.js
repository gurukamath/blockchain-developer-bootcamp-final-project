import React, { useEffect, useState } from "react";
import TileContainer from "./TileContainer.js";
import AuctionSelector from "./AuctionSelector.js";
import AuctionCreator from "./AuctionCreator.js";
import Footer from "./Footer.js";
import Header from "./Header.js";
import "../css/App.css";
import { clientInit, defineNewContractInstance } from "./Client.js";
import { findRole } from "./utils.js";

const contractJSON = require("../contracts/SecretAuction.json");
const factoryJSON = require("../contracts/AuctionFactory.json");

let factory;
let currRole = "";
let currStage = 0;
let currAccounts;
let currNetwork;
const expectedNetwork = 1337;

function App() {
  const [web3Provider, setWeb3Provider] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [network, setNetwork] = useState("");
  const [deployedAuctionAddresses, setDeployedAuctionAddresses] = useState([]);
  const [contract, setContract] = useState({
    name: "",
    desc: "",
    address: "",
    contractDetails: "",
  });
  const [role, setRole] = useState("");
  const [stage, setStage] = useState(0);

  useEffect(() => {
    async function fetchData() {
      if (web3Provider.currentProvider) {
        currAccounts = await web3Provider.currentProvider
          .request({
            method: "eth_requestAccounts",
          })
          .catch((e) => window.alert(e.message));
        setAccounts(currAccounts);

        currNetwork = await web3Provider.eth
          .getChainId()
          .catch((e) => window.alert(e.message));

        setNetwork(currNetwork);

        web3Provider.currentProvider.on("accountsChanged", async (accounts) => {
          setAccounts(accounts);
        });

        web3Provider.currentProvider.on("chainChanged", async (network) => {
          currNetwork = await web3Provider.eth
            .getChainId()
            .catch((e) => window.alert(e.message));

          setNetwork(currNetwork);
        });
      }
    }
    fetchData();
  }, [web3Provider]);

  useEffect(() => {
    async function fetchData() {
      if (network === expectedNetwork) {
        if (contract.contractDetails) {
          currRole = await findRole(
            contract.contractDetails,
            accounts[0]
          ).catch((e) => window.alert(e));

          setRole(currRole);

          currStage = await contract.contractDetails.methods["auctionStage()"]()
            .call()
            .catch((e) => window.alert(e));

          setStage(currStage);
        }

        factory = await defineNewContractInstance(
          web3Provider,
          factoryJSON
        ).catch((e) => window.alert(e));

        const deployedAuctionList = await factory
          .getPastEvents("ContractCreated", {
            fromBlock: 0,
            toBlock: "latest",
          })
          .catch((e) => window.alert(e));

        const addressList = deployedAuctionList.map((v) => {
          return v["returnValues"];
        });

        setDeployedAuctionAddresses(addressList);
      }
    }

    fetchData();
  }, [web3Provider, contract, accounts, network]);

  async function providerConnect() {
    const web3 = await clientInit().catch((e) => window.alert(e.message));
    setWeb3Provider(web3);

    // currNetwork = await web3.eth
    //   .getChainId()
    //   .catch((e) => window.alert(e.message));

    // setNetwork(currNetwork);
  }

  async function createNewAuction(name, desc) {
    factory = await defineNewContractInstance(web3Provider, factoryJSON);

    const receipt = await factory.methods["createAuction(string,string)"](
      name.toString(),
      desc.toString()
    )
      .send({ from: accounts[0] })
      .catch((e) => window.alert(e.message));

    const newContractDetails =
      receipt["events"]["ContractCreated"]["returnValues"];
    const newContract = new web3Provider.eth.Contract(
      contractJSON.abi,
      newContractDetails["newAddress"]
    );

    setContract({
      name: newContractDetails._name.toString(),
      desc: newContractDetails._desc.toString(),
      address: newContractDetails.newAddress,
      contractDetails: newContract,
    });
  }

  async function selectAuction(auction) {
    const newContract = new web3Provider.eth.Contract(
      contractJSON.abi,
      auction.newAddress
    );

    setContract({
      name: auction._name,
      desc: auction._desc,
      address: auction.newAddress,
      contractDetails: newContract,
    });
  }

  return (
    <div className="App">
      <Header account={accounts[0]} />
      {!web3Provider && !contract.contractDetails && (
        <button
          onClick={() => {
            providerConnect();
          }}
          className="btn btn-secondary connectClient"
        >
          Connect Client
        </button>
      )}
      {web3Provider && network !== expectedNetwork && (
        <div>
          You are not connected to the Ropsten Network. Please change the
          network in your Web3 provider.
        </div>
      )}
      {web3Provider &&
        network === expectedNetwork &&
        !contract.contractDetails && (
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
      {network === expectedNetwork &&
        contract.contractDetails &&
        role === "AuctionOwner" &&
        stage === "0" && (
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
      {network === expectedNetwork &&
        contract.contractDetails &&
        role === "AuctionOwner" &&
        stage === "1" && (
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
      {network === expectedNetwork &&
        contract.contractDetails &&
        role === "AuctionOwner" &&
        stage === "2" && (
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

      {network === expectedNetwork &&
        contract.contractDetails &&
        role === "AuctionParticipant" &&
        stage === "1" && (
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
      {network === expectedNetwork &&
        contract.contractDetails &&
        role === "AuctionParticipant" &&
        stage === "2" && (
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
