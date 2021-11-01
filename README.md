Project Name
============
Application For Closed Auctioning of Entities


Business Case
=============
In many business transactions, including the sale of company assets or an entire company, auctions are conducted in a closed format whereby interested parties submit sealed bids to the seller. These bid amounts are only known by the seller. Sometimes, government assets are sold/leased/allocated this way. Because of the high value of the items that are usually involved in such auctions, this could lead to collusion between the seller and some of the bidders. This app aims to conduct such auction on chain so that nobody (not even the seller), is aware of what the various bids are until the auction close.


The Application
===============
The intereseted parties will be able to submit secret bids to a smart contract. The owner of the contract will only be able to declare/control the opening and closing of the auction (both of which will emit events that any interested party can listen into/track). Upon auction close, the smart contract will decide the winning bid without further intervention from the owner.


Further Development
===================
The following features will be added
1. Upon auction close, reveal the winner
2. Write tests to the smart contracts
3. Provision for a security deposit in bids
4. Enable participant to withdraw security bid upon auction close
