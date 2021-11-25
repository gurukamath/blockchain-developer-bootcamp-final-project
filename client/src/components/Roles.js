export const RoleDefinitions = {
  AuctionOwner0: ["StartCommitStage"],
  AuctionOwner1: ["StartRevealStage"],
  AuctionOwner2: ["CloseAuction"],
  AuctionParticipant1: ["CommitNewBid"],
  AuctionParticipant2: ["RevealCommittedBid"],
  AuctionOwner: [
    "CommitHashes",
    "RevealedBids",
    "auctionStage",
    "owner",
    "StartCommitStage",
    "StartRevealStage",
    "CloseAuction",
  ],
  AuctionParticipant: [
    "CommitHashes",
    "RevealedBids",
    "auctionStage",
    "owner",
    "CommitNewBid",
    "RevealCommittedBid",
  ],
};

export const stageDescriptions = {
  AuctionOwner0:
    "The auction has just started. As the auction owner, you can start the commit stage below",
  AuctionParticipant0:
    "The auction has just started. As an auction participant, you have to wait for the owner to start the commit stage",
  AuctionOwner1:
    "The auction is in the commit stage. As the auction owner, you can start the reveal stage below",
  AuctionParticipant1:
    "The auction is currently in the commit stage. As an auction participant, you can commit your bid now",
  AuctionOwner2:
    "The auction is in the reveal stage. As the auction owner, you can close the auction below",
  AuctionParticipant2:
    "The auction is currently in the reveal stage. As an auction participant, you can reveal a committed bid now",
  AuctionOwner3: "The auction is already closed. No further action to be taken",
  AuctionParticipant3:
    "The auction is already closed. No further action to be taken",
};
