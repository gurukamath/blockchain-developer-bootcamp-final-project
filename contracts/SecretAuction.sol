// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

/// @title Secret Auction Contract
/// @author Guruprasad Kamath
/// @dev Smart-contract to conduct secret auctions
contract SecretAuction {

  /// Variables

  /// @notice owner of the auction
  address public owner;

  /// @notice Current Leader address(s). Array in case of a tie. Final winner(s) upon auction close
  address[] public currentLeaders;
  /// @notice Current Leading bid. Final winning bid upon auction close
  uint public currentLeaderBid;

  /// @notice Auction stages. Only the auction owner can change the stage
  enum AuctionStage {
    Start,
    Commit,
    Reveal,
    Closed
  }

  AuctionStage public auctionStage;

  /// @notice a mapping of all the hashes committed by the participants during commit stage
  mapping(address => bytes32) public CommitHashes;

  /// @notice a mapping of all the bids revealed by the participants during reveal stage
  mapping(address => uint) public RevealedBids;



  ///Events

  /// @notice Emitted when the owner changes the auction stage
  /// @param _update String describing the change
  event LogStageChange(string _update);

  /// @notice Emitted when a participant commits a hash
  /// @param _address Address of the committing participant
  /// @param _hash Hash committed by the participant
  event BidCommitted(address _address, bytes32 _hash);

  /// @notice Emitted when a participant reveals their bid
  /// @param _address Address of the participant
  /// @param _bidAmount Bid amount committed by the participant
  /// @param _auctionKey Pass-phrase used by the participant
  event BidRevealed(address _address, uint _bidAmount, string _auctionKey);


  ///Modifiers
  /// @dev Verfiy that the address is that of the auction owner
  /// @param _addr address
  modifier isOwner(address _addr) {
    require(_addr == owner, "You are not the owner of this auction");
    _;
  }

  /// @dev Checks if the auction is in "start" stage
  modifier StartStage() {
    require(auctionStage == AuctionStage.Start, "The auction is not in start stage");
    _;
  }

  /// @dev Checks if the auction is in the "commit" stage
    modifier CommitStage() {
    require(auctionStage == AuctionStage.Commit, "The auction is not in commit stage");
    _;
  }

  /// @dev Checks if the auction is in "reveal" stage
  modifier RevealStage() {
    require(auctionStage == AuctionStage.Reveal, "The auction is not in reveal stage");
    _;
  }

  /// @dev creates a auction and defines its owner
  /// @param _owner an ethereum address that will be defined as the auction owner
  constructor(address _owner) {

    owner = _owner;

    emit LogStageChange("The auction has been deployed to the chain");
  }

  /// @dev changes the stage from "start" to "commit". Only the auction owner can execute this
  function StartCommitStage() external isOwner(msg.sender) StartStage {
    auctionStage = AuctionStage.Commit;
    emit LogStageChange("Bids can be committed now");
  }

  /// @dev changes the stage from "commit" to "reveal". Only the auction owner can execute this
  function StartRevealStage() external isOwner(msg.sender) CommitStage {
    auctionStage = AuctionStage.Reveal;
    emit LogStageChange("Bids can be revealed now");
  }

  /// @dev closes the auction. Only the auction owner can execute this
  function CloseAuction() external isOwner(msg.sender) RevealStage {
    auctionStage = AuctionStage.Closed;
    emit LogStageChange("Auction Closed");
  }

  /// @dev Accepts bids from participants in the form of a hash
  /// @notice the hash is created out of the bid amount and a passphrase that only the participant knows
  /// @param _hash a valid auction bid hash
  function CommitNewBid(bytes32 _hash) public CommitStage {

    CommitHashes[msg.sender] = _hash;

    emit BidCommitted(msg.sender, _hash);

  }

  /// @dev Reveals bid amounts based on previously committed hash
  /// @notice This can be called in the reveal stage
  /// @param _bidAmount the amount used to create the hash during commit
  /// @param _auctionKey the pass-phrase used to create the hash during commit
  function RevealCommittedBid(uint _bidAmount, string memory _auctionKey) 
    public 
    RevealStage {

      require(CommitHashes[msg.sender].length > 0, "The user has not committed a bid. Reveal not possible");
      bytes32 revealHash = keccak256(abi.encode(_bidAmount, _auctionKey));

      require(CommitHashes[msg.sender] == revealHash, "Revealed bid is not the same as the one committed. Reveal not Allowed");
      
      RevealedBids[msg.sender] = _bidAmount;

      emit BidRevealed(msg.sender, _bidAmount, _auctionKey);

      if (_bidAmount > currentLeaderBid){
        currentLeaderBid = _bidAmount;
        currentLeaders = [msg.sender];
      } else if (_bidAmount == currentLeaderBid) {
        currentLeaders.push(msg.sender);
      }

    }
}