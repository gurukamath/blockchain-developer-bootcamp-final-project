//Get the list of methods from the contract JSON

const defineFunction = async function(inputs, contractInstance, element){

    // const inputArray = inputs[0].split(",");
    const inputArray = inputs;
    if (!contractInstance){
        return "Please Connect a Client";
    }
    let result = {success: null, error: null}; 
    if (element.callorsend === "call") {
        if (element.noInputs){

            result.success = await contractInstance.methods[element.textSignature]().call()
                    .catch(e => {result.error = handleErrorMessage(e.message)});
        } else {
            result.success = await contractInstance.methods[element.textSignature](...inputArray).call()
                    .catch(e => {result.error = handleErrorMessage(e.message)});
        }
        
    } else if (element.callorsend === "send") {
        let t;
        
        if (element.noInputs) {
            t = await contractInstance.methods[element.textSignature]().send()
                    .catch(e => {result.error = handleErrorMessage(e.message)});
        } else {
            t = await contractInstance.methods[element.textSignature](...inputArray).send()
                    .catch(e => {result.error = handleErrorMessage(e.message)});
        }

        if (!result.error){ result.success = t.transactionHash}  
    }


    return result.success ?? result.error;

}

export const getMethodList = function(contract, contractInstance) {

    const methodList = [];

    const callFunctions = ["view"];
    const sendFunctions = ["nonpayable"];

    const functionList = contract.abi.filter((el) => {
        return el["type"] === "function";
    });

    functionList.forEach((element) => {
        let methodDefinition = {name: "", noInputs: false, textSignature:"", callorsend:""};
        methodDefinition.name = element.name;
        methodDefinition.noInputs = false;
        let methodInputs = "";
        let inputNames = [];
        element.inputs.forEach((el) => {
            if (methodInputs === "") {
                methodInputs = el.type;
            } else {
                methodInputs = methodInputs + "," + el.type;
            }
            inputNames.push({type: el.type, name: el.name});
        })
        if (methodInputs === ""){
            methodDefinition.noInputs = true;
        }
        methodDefinition.inputNames = inputNames;
        methodDefinition.textSignature = methodDefinition.name + "(" + methodInputs + ")";

        if (callFunctions.includes(element.stateMutability)){
            methodDefinition.callorsend = "call";
        } else if (sendFunctions.includes(element.stateMutability)) {
            methodDefinition.callorsend = "send";
        }

        methodList.push(methodDefinition);
    })

    methodList.forEach((element) => {
        element.functionDef = function(inputs){
            return defineFunction(inputs, contractInstance, element);
        }
        
    })

    return methodList;
}





const errorString = "VM Exception while processing transaction: ";
const errorList = [
    "revert",
    "out of gas",
    "invalid JUMP",
    "invalid opcode",
    "stack overflow",
    "stack underflow",
    "static state change"
]
    
export const handleErrorMessage = function(msg) {
    let displayMsg = "Unknown Error!";
    errorList.forEach(element => {

        if (msg.search(errorString + element) >= 0) {
            displayMsg =  msg.replace(errorString + element, `(${element}) -`);
        }
    })
    return displayMsg;
}



export const getInputFields = function(methodList) {
    let inputFields = [];

    methodList.forEach(element => {
        inputFields.push(element.inputNames);
    })
    // console.log(inputFields);

    return inputFields;
}

export const nullifyArray = function(arr) {
    let nullifiedArray = [];

    arr.forEach(element => {
        // console.log(element);
        let elementsUpdated = [];
        element.forEach(el => {
            el.value = '';
            elementsUpdated.push(el);
        })
        // const nullElement = Array(element.length).fill('');
        if (element.length > 0) {
            nullifiedArray.push(elementsUpdated);
        } else {
            nullifiedArray.push([]);
        }
        
    })
    return nullifiedArray;    
}
