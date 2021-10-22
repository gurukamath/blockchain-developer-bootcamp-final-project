// var Contract = require('web3-eth-contract');
import Web3 from 'web3';
import { getMethodList } from './utils';
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
    element.functionDef = async function(inputs){

        const inputArray = inputs[0].split(",");
        if (!contractInstance){
            return "Please Connect a Client";
        }
        let result; 
        if (element.callorsend === "call") {
            if (element.noInputs){

                result = await contractInstance.methods[element.textSignature]().call()
                                    .catch(e => console.log('Error 1: ', e.message));
            } else {
                result = await contractInstance.methods[element.textSignature](...inputArray).call()
                                    .catch(e => console.log('Error 2: ', e.message));
            }
            
        } else if (element.callorsend === "send") {
            let t;
            if (element.noInputs) {
                t = await contractInstance.methods[element.textSignature]().send()
                                    .catch(e => console.log('Error 3: ', e.message));
            } else {
                t = await contractInstance.methods[element.textSignature](...inputArray).send()
                                    .catch(e => console.log('Error 4: ', e.message));
            }
            result = t.transactionHash;
            
        }


        return result;
    
    }
})

const _index = initiateMethodList.findIndex((obj => obj.name === "CommitNewBid"));
initiateMethodList[_index].functionDef = async function(inputs) {
    const inputArray = inputs[0].split(",");
    if (!contractInstance){
        return "Please Connect a Client";
    }

    const encoded = web3.eth.abi.encodeParameters(['uint256', 'string'], inputArray);
    const hash = web3.utils.sha3(encoded, {encoding: 'hex'})

    const t = await contractInstance.methods[initiateMethodList[_index].textSignature](hash).send()
                                    .catch(e => console.log('Error 4: ', e.message));

    return t.transactionHash;

}
initiateMethodList[_index].inputNames = "uint256 _bidAmount; string _auctionKey";


export const contractMethodList = initiateMethodList;