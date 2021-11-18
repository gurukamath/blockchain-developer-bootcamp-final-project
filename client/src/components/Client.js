import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

export const clientInit = async function () {
  let web3;

  // Initiate the Web3 Provider
  const provider = await detectEthereumProvider();

  if (provider === window.ethereum) {
    web3 = new Web3(provider);
  } else {
    web3 = new Web3("http://localhost:8545"); // Local Ganache
  }

  return web3;
};

export const defineNewContractInstance = async function (
  web3Instance,
  contractJsonObject
) {
  const netId = await web3Instance.currentProvider.request({
    method: "net_version",
  });

  const accounts = await web3Instance.currentProvider.request({
    method: "eth_requestAccounts",
  });

  return new web3Instance.eth.Contract(
    contractJsonObject.abi,
    contractJsonObject.networks[netId].address,
    { from: accounts[0] }
  );
};
