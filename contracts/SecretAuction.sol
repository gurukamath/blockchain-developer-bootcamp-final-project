// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract SecretAuction {

  ///Variables
  address public owner;

  address[] public currentLeaders;
  uint public currentLeaderBid;

  enum AuctionStage {
    Start,
    Commit,
    Reveal,
    Closed
  }

  AuctionStage public auctionStage;

  mapping(address => bytes32) public CommitHashes;

  mapping(address => uint) public RevealedBids;

  ///Events
  event LogStageChange(string _update);

  event BidCommitted(address _address, bytes32 _hash);

  event BidRevealed(address _address, uint _bidAmount, string _auctionKey);


  ///Modifiers
  modifier isOwner(address _addr) {
    require(_addr == owner, "You are not the owner of this auction");
    _;
  }

    modifier CommitStage() {
    require(auctionStage == AuctionStage.Commit, "The auction is not in commit stage");
    _;
  }

  modifier StartStage() {
    require(auctionStage == AuctionStage.Start, "The auction is not in start stage");
    _;
  }

  modifier RevealStage() {
    require(auctionStage == AuctionStage.Reveal, "The auction is not in reveal stage");
    _;
  }


  constructor(address _owner) {

    owner = _owner;

    emit LogStageChange("The auction has been deployed to the chain");
  }

  function StartCommitStage() external isOwner(msg.sender) StartStage {
    auctionStage = AuctionStage.Commit;
    emit LogStageChange("Bids can be committed now");
  }

  function StartRevealStage() external isOwner(msg.sender) CommitStage {
    auctionStage = AuctionStage.Reveal;
    emit LogStageChange("Bids can be revealed now");
  }

  function CloseAuction() external isOwner(msg.sender) RevealStage {
    auctionStage = AuctionStage.Closed;
    emit LogStageChange("Auction Closed");
  }

  function CommitNewBid(bytes32 _hash) public CommitStage {

    CommitHashes[msg.sender] = _hash;

    emit BidCommitted(msg.sender, _hash);

  }


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