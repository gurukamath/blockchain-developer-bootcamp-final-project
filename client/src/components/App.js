import React, { useEffect, useState } from "react";
import TileContainer from "./TileContainer.js";
import AuctionSelector from "./AuctionSelector.js";
import AuctionCreator from "./AuctionCreator.js";
import Footer from "./Footer.js";
import Header from "./Header.js";
import GoToOtherAuctions from "./GoToOtherAuctions";
import "../css/App.css";
import { clientInit, defineNewContractInstance } from "./Client.js";
import { findRole } from "./utils.js";
import { Spinner } from "react-bootstrap";

const contractJSON = require("../contracts/SecretAuction.json");
const factoryJSON = require("../contracts/AuctionFactory.json");

let factory;
let currRole = "";
let currStage = 0;
let currAccounts;
let currNetwork;
const expectedNetwork = 3;
let numWinners;
let winningBid;
let winners = [];

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

  const loadState = {
    LOADING: "LOADING",
    READY: "READY",
    ERROR: "ERROR",
  };

  const [status, setStatus] = useState(loadState.READY);

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
    setStatus("LOADING");
    fetchData().then(() => setStatus("READY"));
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

          if (currStage === "3") {
            winningBid = await contract.contractDetails.methods[
              "currentLeaderBid()"
            ]()
              .call()
              .catch((e) => window.alert(e));

            numWinners = await contract.contractDetails.methods[
              "getLeadersNum()"
            ]()
              .call()
              .catch((e) => window.alert(e));

            winners = [];
            for (let i = 0; i < numWinners; i++) {
              let winner = await contract.contractDetails.methods[
                "getLeader(uint256)"
              ](i)
                .call()
                .catch((e) => window.alert(e));

              winners.push(winner);
            }
          }

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

    setStatus("LOADING");
    fetchData().then(() => setStatus("READY"));
  }, [web3Provider, contract, accounts, network]);

  async function providerConnect() {
    setStatus(loadState.LOADING);
    const web3 = await clientInit().catch((e) => window.alert(e.message));
    setWeb3Provider(web3);
    setStatus(loadState.READY);
  }

  async function createNewAuction(name, desc) {
    setStatus(loadState.LOADING);
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
    setStatus(loadState.READY);
  }

  function refreshAuction() {
    setStatus(loadState.LOADING);
    const auction = { ...contract };
    setContract(auction);
    setStatus(loadState.READY);
  }

  async function selectAuction(auction) {
    setStatus(loadState.LOADING);
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
    setStatus(loadState.READY);
  }

  function chooseAnotherAuction() {
    setStatus(loadState.LOADING);
    setContract({
      name: "",
      desc: "",
      address: "",
      contractDetails: "",
    });
    setStatus(loadState.READY);
  }

  return (
    <div className="App">
      <Header account={accounts[0]} />
      {!web3Provider &&
        !contract.contractDetails &&
        status === loadState.READY && (
          <button
            onClick={() => {
              providerConnect();
            }}
            className="btn btn-secondary connectClient"
          >
            Connect Client
          </button>
        )}
      {status === loadState.LOADING && (
        <div>
          <Spinner animation="border" size="sm" style={{ marginTop: "20px" }} />
          <p>Loading...</p>
        </div>
      )}
      {web3Provider &&
        network !== expectedNetwork &&
        status === loadState.READY && (
          <div>
            You are not connected to the Ropsten Network. Please change the
            network in your Web3 provider.
          </div>
        )}
      {web3Provider &&
        network === expectedNetwork &&
        !contract.contractDetails &&
        status === loadState.READY && (
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
        stage === "0" &&
        status === loadState.READY && (
          <div className="tileContainer">
            <TileContainer
              web3={web3Provider}
              contract={contract}
              accounts={accounts}
              chooseAnotherAuction={chooseAnotherAuction}
              refreshAuction={refreshAuction}
              setStatus={[status, setStatus]}
              showOr={1}
              role={role}
              stage={stage}
            />
          </div>
        )}
      {network === expectedNetwork &&
        contract.contractDetails &&
        role === "AuctionOwner" &&
        stage === "1" &&
        status === loadState.READY && (
          <div className="tileContainer">
            <TileContainer
              web3={web3Provider}
              contract={contract}
              accounts={accounts}
              chooseAnotherAuction={chooseAnotherAuction}
              refreshAuction={refreshAuction}
              setStatus={[status, setStatus]}
              showOr={1}
              role={role}
              stage={stage}
            />
          </div>
        )}
      {network === expectedNetwork &&
        contract.contractDetails &&
        role === "AuctionOwner" &&
        stage === "2" &&
        status === loadState.READY && (
          <div className="tileContainer">
            <TileContainer
              web3={web3Provider}
              contract={contract}
              accounts={accounts}
              chooseAnotherAuction={chooseAnotherAuction}
              refreshAuction={refreshAuction}
              setStatus={[status, setStatus]}
              showOr={1}
              role={role}
              stage={stage}
            />
          </div>
        )}

      {network === expectedNetwork &&
        contract.contractDetails &&
        role === "AuctionParticipant" &&
        stage === "0" &&
        status === loadState.READY && (
          <div>
            <div className="card">
              <div className="card-body">
                <p>
                  The auction is in the start stage. As an auction participant,
                  you cannot perform any actions right now. Please wait for the
                  auction owner to start the commit stage.
                </p>
              </div>
            </div>
            <GoToOtherAuctions chooseAnotherAuction={chooseAnotherAuction} />
          </div>
        )}

      {network === expectedNetwork &&
        contract.contractDetails &&
        role === "AuctionParticipant" &&
        stage === "1" &&
        status === loadState.READY && (
          <div className="tileContainer">
            <TileContainer
              web3={web3Provider}
              contract={contract}
              accounts={accounts}
              chooseAnotherAuction={chooseAnotherAuction}
              refreshAuction={refreshAuction}
              setStatus={[status, setStatus]}
              showOr={1}
              role={role}
              stage={stage}
            />
          </div>
        )}
      {network === expectedNetwork &&
        contract.contractDetails &&
        role === "AuctionParticipant" &&
        stage === "2" &&
        status === loadState.READY && (
          <div className="tileContainer">
            <TileContainer
              web3={web3Provider}
              contract={contract}
              accounts={accounts}
              chooseAnotherAuction={chooseAnotherAuction}
              refreshAuction={refreshAuction}
              setStatus={[status, setStatus]}
              showOr={1}
              role={role}
              stage={stage}
            />
          </div>
        )}
      {network === expectedNetwork &&
        contract.contractDetails &&
        stage === "3" &&
        status === loadState.READY && (
          <div>
            <div className="card">
              <div className="card-body">
                <p>This auction has been closed.</p>
                <p>
                  The winning bid is <b>{winningBid}</b>
                </p>
                <p>The winning participant(s) is(are)</p>
                {winners.map((v, i) => {
                  return (
                    <p>
                      <b key={i}>{v}</b>
                    </p>
                  );
                })}
              </div>
            </div>
            <GoToOtherAuctions chooseAnotherAuction={chooseAnotherAuction} />
          </div>
        )}
      <Footer />
    </div>
  );
}

export default App;
