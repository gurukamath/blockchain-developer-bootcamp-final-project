import {handleErrorMessage} from './utils.js';

const callFunction = async (inputs, functionHash, contract) => {
                        let result = {success: null, error: null};

                        result.success = await contract
                                            .methods[functionHash](...inputs)
                                            .call()
                                            .catch(e => {result.error = handleErrorMessage(e.message)});
                        
                        return result.success ?? result.error;
                    }

const sendFunction = async (inputs, functionHash, contract) => {
                        let result = {success: null, error: null};

                        result.success = await contract
                                            .methods[functionHash](...inputs)
                                            .send()
                                            .catch(e => {result.error = handleErrorMessage(e.message)});
                        
                        return result.success.transactionHash ?? result.error;
                    }


export const FullMethodList = [
    {
      name: "CommitHashes",
      noInputs: false,
      textSignature: "CommitHashes(address)",
      callorsend: "call",
      inputNames: [{ type: "address", name: "" }],
      functionDef: async (inputs, contract) => {
        const result = await callFunction(inputs, "CommitHashes(address)", contract);

        return result;
      } 
    },
    {
      name: "RevealedBids",
      noInputs: false,
      textSignature: "RevealedBids(address)",
      callorsend: "call",
      inputNames: [{ type: "address", name: "" }],
      functionDef: async (inputs, contract) => {
        const result = await callFunction(inputs, "RevealedBids(address)", contract);

        return result;
      } 
    },
    {
      name: "auctionStage",
      noInputs: true,
      textSignature: "auctionStage()",
      callorsend: "call",
      inputNames: [],
      functionDef: async (inputs, contract) => {
        const result = await callFunction(inputs, "auctionStage()", contract);

        return result;
      } 
    },
    {
      name: "owner",
      noInputs: true,
      textSignature: "owner()",
      callorsend: "call",
      inputNames: [],
      functionDef: async (inputs, contract) => {
        const result = await callFunction(inputs, "owner()", contract);

        return result;
      } 
    },
    {
      name: "StartCommitStage",
      noInputs: true,
      textSignature: "StartCommitStage()",
      callorsend: "send",
      inputNames: [],
      functionDef: async (inputs, contract) => {
        const result = await sendFunction(inputs, "StartCommitStage()", contract);

        return result;
      } 
    },
    {
      name: "StartRevealStage",
      noInputs: true,
      textSignature: "StartRevealStage()",
      callorsend: "send",
      inputNames: [],
      functionDef: async (inputs, contract) => {
        const result = await sendFunction(inputs, "StartRevealStage()", contract);

        return result;
      } 
    },
    {
      name: "CloseAuction",
      noInputs: true,
      textSignature: "CloseAuction()",
      callorsend: "send",
      inputNames: [],
      functionDef: async (inputs, contract) => {
        const result = await sendFunction(inputs, "StartRevealStage()", contract);

        return result;
      } 
    },
    {
      name: "CommitNewBid",
      noInputs: false,
      textSignature: "CommitNewBid(bytes32)",
      callorsend: "send",
      inputNames: [
        { type: "uint256", name: "_bidAmount" },
        { type: "string", name: "_auctionKey" },
      ],
      functionDef: async (inputs, contract) => {
        const result = await sendFunction(inputs, "CommitNewBid(bytes32)", contract);

        return result;
      } 
    },
    {
      name: "RevealCommittedBid",
      noInputs: false,
      textSignature: "RevealCommittedBid(uint256,string)",
      callorsend: "send",
      inputNames: [
        { type: "uint256", name: "_bidAmount" },
        { type: "string", name: "_auctionKey" },
      ],
      functionDef: async (inputs, contract) => {
        const result = await sendFunction(inputs, "RevealCommittedBid(uint256,string)", contract);

        return result;
      } 
    },
  ];
  