// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import './SecretAuction.sol';

contract AuctionFactory {
    SecretAuction[] public auctions;

    event ContractCreated(address newAddress);

    function createAuction() public {
        SecretAuction auction = new SecretAuction(msg.sender);
        auctions.push(auction);

        emit ContractCreated(address(auction));
    }
}