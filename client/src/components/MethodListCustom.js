import { getMethodList, handleErrorMessage } from './utils';

export const customizeMethodList = async function(contract, contractInstance, web3){
    
    let initiateMethodList = getMethodList(contract, contractInstance);

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

    return initiateMethodList
} 
