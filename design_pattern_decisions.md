# Design patterns used

## Access Control Design Patterns

- `Ownable` design pattern used in the following functions: `StartCommitStage()`, `StartRevealStage()` and `CloseAuction()`. These functions do not need to be used by anyone else apart from the contract creator (Auction Owner). Only the owner has the right to change the stage of an auction.

- The following functions are restricted based on the stage of the auction
  - `CommitNewBid()` can only be called when the auction is in commit stage.
  - `RevealCommittedBid()` can only be called when the auction is in reveal stage.

## Inheritence and Interfaces

- The `SecretAuction` contract inherits from Open Zeppelin `Ownable.sol`

## Factory Design Pattern

- Individual `SecretAuction` contracts be deployed by using the `AuctionFactory` contract.
