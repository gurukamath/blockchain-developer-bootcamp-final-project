const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");

require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const INFURA_URL = process.env.INFURA_URL;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    ropsten: {
      provider: () => new HDWalletProvider(PRIVATE_KEY, INFURA_URL),
      network_id: 3, // Rinkeby's id
      gas: 4000000,
    },
  },
  compilers: {
    solc: {
      version: "^0.8", // Fetch latest 0.8.x Solidity compiler
    },
  },
};
