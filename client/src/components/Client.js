// var Contract = require('web3-eth-contract');
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';


export const clientInit = async function(contractJSON){

    let web3;
    let selectedAccount;
    let contractInstance;

    const defineNewContractInstance = function(jsonObj, id, account) {
        return new web3.eth.Contract(jsonObj.abi, 
                                    jsonObj.networks[id].address,
                                                        {from: account});
    }


// Initiate the Web3 Provider
    const provider = await detectEthereumProvider();

    if (provider === window.ethereum) {
        web3 = new Web3(provider);
    } else {
        web3 = new Web3('http://localhost:8545'); // Local Ganache
    }


    let netId = await provider.request({ method: 'net_version' });

    let accounts = await provider.request({method: 'eth_requestAccounts'});
    selectedAccount = accounts[0];

    contractInstance = defineNewContractInstance(contractJSON, netId, selectedAccount);

    // Listen in case something changes

    // provider.on('networkChanged', (_netId) => {
    //     netId = _netId;
    //     contractInstance = defineNewContractInstance(contractJSON, netId, selectedAccount);
    // })

    // web3.currentProvider.on('accountsChanged', (accounts) => {
    //     selectedAccount = accounts[0];
    //     // console.log(selectedAccount);
    //     // nonce = web3.eth.getTransactionCount(selectedAccount);
    //     contractInstance = defineNewContractInstance(contractJSON, netId, selectedAccount);
    // })

    return [web3, contractInstance]

}