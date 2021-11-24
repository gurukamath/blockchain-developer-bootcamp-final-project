# Security considerations

## Use Modifiers for Validations

- The auction functions use the following modifiers at various stages
  - `StartStage`
  - `CommitStage`
  - `RevealStage`
- Additionally the `onlyOwner()` modifier from OpenZeppelin's `Ownable` design pattern is used wherever a certain action is only allowed for the contract owner

## Use of Require, Assert and Revert

- The validations have been used at various stages to gaurd against actions that are not allowed

## TX Origin Authentication

- Owner authentication is done using msg.sender and not tx.origin
