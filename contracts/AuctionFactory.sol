// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "./SecretAuction.sol";

contract AuctionFactory {
    SecretAuction[] public auctions;

    event ContractCreated(string _name, string _desc, address newAddress);

    function createAuction(string memory _name, string memory _desc) public {
        SecretAuction auction = new SecretAuction(msg.sender);
        auctions.push(auction);

        emit ContractCreated(_name, _desc, address(auction));
    }
}
