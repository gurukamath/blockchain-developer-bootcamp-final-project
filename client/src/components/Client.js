// var Contract = require('web3-eth-contract');
import Web3 from 'web3';
import { getMethodList, defineFunction } from './utils';
const contractJSON = require("../contracts/SecretAuction.json"); 


let selectedAccount;
let contractInstance;
let web3;

export const clientInit = async function(){

    const provider = 'http://localhost:8545';

    web3 = new Web3(provider);

    const accountsList = await web3.eth.getAccounts()
                            .catch(e => console.log('Error Web3 Accounts: ', e.message));
    selectedAccount = accountsList[0];
    contractInstance = new web3.eth.Contract(contractJSON.abi, 
                                contractJSON.networks[5777].address,
                                                    {from: selectedAccount});
    

}

const initiateMethodList = getMethodList(contractJSON);

initiateMethodList.forEach((element) => {
    element.functionDef = function(inputs){
        return defineFunction(inputs, contractInstance, element);
    }
    
})

const _index = initiateMethodList.findIndex((obj => obj.name === "CommitNewBid"));
initiateMethodList[_index].functionDef = async function(inputs) {
    const inputArray = inputs[0].split(",");
    let result = {success: null, error: null}; 
    if (!contractInstance){
        return "Please Connect a Client";
    }

    const encoded = web3.eth.abi.encodeParameters(['uint256', 'string'], inputArray);
    const hash = web3.utils.sha3(encoded, {encoding: 'hex'})

    const t = await contractInstance.methods[initiateMethodList[_index].textSignature](hash).send()
                                    .catch(e => {result.error = 'Error: ' + e.message});

            if (!result.error){ result.success = t.transactionHash} 

    return result.success ?? result.error;

}
initiateMethodList[_index].inputNames = "uint256 _bidAmount; string _auctionKey";


export const contractMethodList = initiateMethodList;