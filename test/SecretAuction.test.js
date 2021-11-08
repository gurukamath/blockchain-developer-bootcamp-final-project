const { catchRevert } = require("./exceptionsHelpers.js");

var SecretAuction = artifacts.require("SecretAuction");

contract("SecretAuction", async (accounts) => {
  const [owner, alice, bob] = accounts;

  beforeEach(async () => {
    instance = await SecretAuction.new();
  });

  it("The deployed auction is in start-auction Stage", async () => {
    const auctionStage = await instance.auctionStage();
    assert.equal(auctionStage, 0, "The auction is not in start-auction stage");
  });
});
