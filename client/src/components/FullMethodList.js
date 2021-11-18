import { handleErrorMessage } from "./utils.js";

const callFunction = async (inputs, functionHash, contract, accounts) => {
  let result = { success: null, error: null };

  result.success = await contract.methods[functionHash](...inputs)
    .call({ from: accounts[0] })
    .catch((e) => {
      result.error = handleErrorMessage(e.message);
    });

  return result.success ?? result.error;
};

const sendFunction = async (inputs, functionHash, contract, accounts) => {
  let result = { success: null, error: null };

  result.success = await contract.methods[functionHash](...inputs)
    .send({ from: accounts[0] })
    .catch((e) => {
      result.error = handleErrorMessage(e.message);
    });

  return (
    "Treansaction Successful: " + result.success.transactionHash ?? result.error
  );
};

export const FullMethodList = [
  {
    name: "CommitHashes",
    noInputs: false,
    textSignature: "CommitHashes(address)",
    callorsend: "call",
    inputNames: [{ type: "address", name: "" }],
    functionDef: async (inputs, contract, accounts) => {
      const result = await callFunction(
        inputs,
        "CommitHashes(address)",
        contract,
        accounts
      );

      return result;
    },
  },
  {
    name: "RevealedBids",
    noInputs: false,
    textSignature: "RevealedBids(address)",
    callorsend: "call",
    inputNames: [{ type: "address", name: "" }],
    functionDef: async (inputs, contract, accounts) => {
      const result = await callFunction(
        inputs,
        "RevealedBids(address)",
        contract,
        accounts
      );

      return result;
    },
  },
  {
    name: "auctionStage",
    noInputs: true,
    textSignature: "auctionStage()",
    callorsend: "call",
    inputNames: [],
    functionDef: async (inputs, contract, accounts) => {
      const result = await callFunction(
        inputs,
        "auctionStage()",
        contract,
        accounts
      );

      return result;
    },
  },
  {
    name: "owner",
    noInputs: true,
    textSignature: "owner()",
    callorsend: "call",
    inputNames: [],
    functionDef: async (inputs, contract, accounts) => {
      const result = await callFunction(inputs, "owner()", contract, accounts);

      return result;
    },
  },
  {
    name: "StartCommitStage",
    noInputs: true,
    textSignature: "StartCommitStage()",
    callorsend: "send",
    inputNames: [],
    functionDef: async (inputs, contract, accounts) => {
      const result = await sendFunction(
        inputs,
        "StartCommitStage()",
        contract,
        accounts
      );

      return result;
    },
    description:
      "This function will start the commit stage. Participants can then commit their bids.",
  },
  {
    name: "StartRevealStage",
    noInputs: true,
    textSignature: "StartRevealStage()",
    callorsend: "send",
    inputNames: [],
    functionDef: async (inputs, contract, accounts) => {
      const result = await sendFunction(
        inputs,
        "StartRevealStage()",
        contract,
        accounts
      );

      return result;
    },
    description:
      "You can use this function to start the reveal stage. Participants will no longer be able to commit new bids.",
  },
  {
    name: "CloseAuction",
    noInputs: true,
    textSignature: "CloseAuction()",
    callorsend: "send",
    inputNames: [],
    functionDef: async (inputs, contract, accounts) => {
      const result = await sendFunction(
        inputs,
        "StartRevealStage()",
        contract,
        accounts
      );

      return result;
    },
    description:
      "You can use this function to close the auction. Participants will no longer be ab;le to reveal any unrevealed bids.",
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
    functionDef: async (inputs, contract, accounts) => {
      const result = await sendFunction(
        inputs,
        "CommitNewBid(bytes32)",
        contract,
        accounts
      );

      return result;
    },
    description:
      "Please provide a bid amount and a passphrase (case-sensitive) of your choice. Do remeember both of these values since you will need them to reveal your bids in the reveal stage",
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
    functionDef: async (inputs, contract, accounts) => {
      const result = await sendFunction(
        inputs,
        "RevealCommittedBid(uint256,string)",
        contract,
        accounts
      );

      return result;
    },
    description:
      "Please provide the exact same bid amount and a passphrase (case-sensitive) that you entered when you comitted the bid",
  },
];
