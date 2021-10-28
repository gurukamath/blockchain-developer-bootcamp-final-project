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
