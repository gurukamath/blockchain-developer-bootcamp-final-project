// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "./SecretAuction.sol";


/// @title Factory contract for Secret Auctions
/// @author Guruprasad Kamath
/// @dev Allows a user to deploy a new Secret Auction Contract
contract AuctionFactory {
    SecretAuction[] public auctions;

    /// @notice Emitted when a user creates a new Auction
    /// @param _name Auction Name
    /// @param _desc Auction Description
    /// @param newAddress Address of the newly deployed SecretAuction Smart contract
    event ContractCreated(string _name, string _desc, address newAddress);


    /// @dev Creates a new auction
    /// @param _name Auction name - Useful for identifying the auction at the front end
    /// @param _desc Auction Description
    function createAuction(string memory _name, string memory _desc) public {
        SecretAuction auction = new SecretAuction(msg.sender);
        auctions.push(auction);

    /// @notice This event can be tracked at the front-end to get a list of deployed auctions
        emit ContractCreated(_name, _desc, address(auction));
    }
}
