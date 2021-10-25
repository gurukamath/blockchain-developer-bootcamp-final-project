// var Contract = require('web3-eth-contract');
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import { getMethodList, defineFunction, handleErrorMessage } from './utils';
const contractJSON = require("../contracts/SecretAuction.json"); 


let selectedAccount;
let contractInstance;
let web3;

export const clientInit = async function(){


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

    provider.on('networkChanged', (_netId) => {
        netId = _netId;
        contractInstance = defineNewContractInstance(contractJSON, netId, selectedAccount);
    })

    provider.on('accountsChanged', (accounts) => {
        selectedAccount = accounts[0];
        // nonce = web3.eth.getTransactionCount(selectedAccount);
        contractInstance = defineNewContractInstance(contractJSON, netId, selectedAccount);
    })

}

function defineNewContractInstance(jsonObj, id, account) {
    return new web3.eth.Contract(jsonObj.abi, 
                                jsonObj.networks[id].address,
                                                    {from: account});
}

const initiateMethodList = getMethodList(contractJSON);

initiateMethodList.forEach((element) => {
    element.functionDef = function(inputs){
        return defineFunction(inputs, contractInstance, element);
    }
    
})

const _index = initiateMethodList.findIndex((obj => obj.name === "CommitNewBid"));
initiateMethodList[_index].functionDef = async function(inputs) {
    const inputArray = inputs;
    let result = {success: null, error: null}; 
    if (!contractInstance){
        return "Please Connect a Client";
    }

    const encoded = web3.eth.abi.encodeParameters(['uint256', 'string'], inputArray);
    const hash = web3.utils.sha3(encoded, {encoding: 'hex'})

    const t = await contractInstance.methods[initiateMethodList[_index].textSignature](hash).send()
                                    .catch(e => {result.error = handleErrorMessage(e.message)});
            console.log(result.error);
            if (!result.error){ result.success = t.transactionHash} 

    return result.success ?? result.error;

}
initiateMethodList[_index].inputNames = [{type: 'uint256', name: '_bidAmount'},
                                        {type: 'string', name: '_auctionKey'}];


export const contractMethodList = initiateMethodList;