# Project Name

Application For Secret Auctioning of Entities

# Business Case

In many business transactions, including the sale of company assets or an entire company, auctions are conducted in a closed format whereby interested parties submit sealed bids to the seller. These bid amounts are only known by the seller. Sometimes, government assets are sold/leased/allocated this way. Because of the high value of the items that are usually involved in such auctions, this could lead to collusion between the seller and some of the bidders. This app aims to conduct such auctions on chain so that nobody (not even the seller), is aware of what the various bids are until the auction is over.


# Deployed Version URL

https://blockchain-developer-bootcamp-final-project-6b9gdg8sv.vercel.app


# How to run this project locally

## Pre-requisites

- Node Version: v14.17.3
- Truffle: v5.4.11
- ganache
- npm

## Local Contract Testing

- git clone `https://github.com/gurukamath/blockchain-developer-bootcamp-final-project.git`
- Run `npm install` in project root to install Truffle build and smart contract dependencies
- Run the local testnet in port 8545 with the `truffle develop` command
- Run the tests in Truffle console: `test`
- Development network id is 1337, remember to change it in Metamask as well if you are trying out the front-end!

## Frontend

- `cd client`
- `npm install`
- `npm start`
- Open `http://localhost:3000`

## Screencast Link

https://youtu.be/gChjg7yk4DM

## Public Wallet for Certification

0xCde6F97F6D97E7Cd53Ff15edbe0E42D5Ca57635D


# The Application - Techincal Details

The intereseted parties will be able to submit secret bids to a smart contract. The owner of the contract will only be able to declare/control the opening and closing of the auction (both of which will emit events that any interested party can listen into/track). Upon auction close, the smart contract will decide the winning bid without further intervention from the owner.

# Auction Details

Every auction will have 3 stages.

- The start stage is initiated immediately upon deployment. The auction participants cannot perform any auctions at this stage. They will have to wait for the auction owner to start the commit stage
- During the commit stage, the participants can commit the hash for their bids. The hash is composed from the bid amount and a passphrase which are encrypted and stored on the contract. The process of generating the hash from the inputs is handled on the clinet front-end. Once a bid has been committed, the participants will have to wait for the auction owner to start the reveal stage.
- During the reveal stage, the participants can reveal their previously committed bids. They will have to use the exact same amount and passphrase to reveal their bids, as they had done during the commit stage. Once the participants have revealed their bid, they will have to wait for the owner to close the auction.

Once the owner closes the auction, the highest revealed bid is considered to be the winner.

![alt text](https://github.com/gurukamath/blockchain-developer-bootcamp-final-project/blob/main/Auction_Process.png?raw=true)

# Directory Structure

- client: Project's React frontend.
- contracts: Smart contracts that are deployed in the Ropsten testnet.
- migrations: Migration files for deploying contracts in contracts directory.
- test: Tests for smart contracts.


# Further Development

The following features are under consideration for future development

1. Use block number to automatically change the auction stages rather than relying on the auction owner to change the stages manually
2. Provision for a minimum security deposit in bids. This ensures only parties that are really interested participate in an auction
3. Enable participant to withdraw security bid upon auction close in case their bid failed. To be implemented as per the approve-withdraw scheme
