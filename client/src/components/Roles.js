export const RoleDefinitions = {
    AuctionOwner0: [
        "StartCommitStage",
    ],
    AuctionOwner1: [
        "StartRevealStage",
    ],
    AuctionOwner2: [
        "CloseAuction",
    ],
    AuctionParticipant1: [
        "CommitNewBid"
    ],
    AuctionParticipant2: [
        "RevealCommittedBid"
    ],
    AuctionOwner: [
        "CommitHashes",
        "RevealedBids",
        "auctionStage",
        "owner",
        "StartCommitStage",
        "StartRevealStage",
        "CloseAuction"
    ],
    AuctionParticipant: [
        "CommitHashes",
        "RevealedBids",
        "auctionStage",
        "owner",
        "CommitNewBid",
        "RevealCommittedBid"
    ]
}

