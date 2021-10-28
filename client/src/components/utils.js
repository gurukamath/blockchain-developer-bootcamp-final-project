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

export const findRole = async (contract, address) => {
    let result = {success: null, error: null};

        result.success = await contract
                            .methods['owner()']()
                            .call()
                            .catch(e => {result.error = handleErrorMessage(e.message)});

        let role;

        if (address.toUpperCase() === result.success.toUpperCase()) {
            role = "AuctionOwner";
        } else {
            role = "AuctionParticipant";
        }

    return role;
}