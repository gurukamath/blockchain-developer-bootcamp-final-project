# Security considerations

## SWC-136 Unencrypted Private Data On-Chain

- Since the bids are to be kept secret until the reveal stage is reached, the committed bids are stored on-chain in an encrypted form on-chain.

## SWC-123 Requirement Violation

- The validations have been used at various stages to gaurd against actions that are not allowed

## SWC-115 Authorization through tx.origin

- Owner authentication is done using msg.sender and not tx.origin
