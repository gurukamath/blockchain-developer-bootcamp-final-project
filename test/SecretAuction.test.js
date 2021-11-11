const { catchRevert } = require("./exceptionsHelpers.js");

var SecretAuction = artifacts.require("SecretAuction");

contract("SecretAuction", async (accounts) => {
  const [owner, alice, bob] = accounts;

  //Alice's Bid
  const amountAlice = 500;
  const phraseAlice = "ThisisAlice";
  const encodedAlice = web3.eth.abi.encodeParameters(
    ["uint256", "string"],
    [amountAlice, phraseAlice]
  );
  const hashAlice = web3.utils.sha3(encodedAlice, { encoding: "hex" });

  //Bob's Bid
  const amountBob = 200;
  const phraseBob = "ThisisBob";
  const encodedBob = web3.eth.abi.encodeParameters(
    ["uint256", "string"],
    [amountBob, phraseBob]
  );
  const hashBob = web3.utils.sha3(encodedBob, { encoding: "hex" });

  beforeEach(async () => {
    instance = await SecretAuction.new();
  });

  describe("When the auction is deployed", () => {
    it("It is in start-auction Stage", async () => {
      const auctionStage = await instance.auctionStage();
      assert.equal(
        auctionStage,
        0,
        "The auction is not in start-auction stage"
      );
    });

    it("Owner can start the commit stage", async () => {
      await instance.StartCommitStage({ from: owner });
      const auctionStage = await instance.auctionStage();
      assert.equal(auctionStage, 1, "The auction is not in commit stage");
    });

    it("Owner cannot directly start the reveal stage", async () => {
      catchRevert(instance.StartRevealStage({ from: owner }));
    });

    it("Owner cannot directly close the auction", async () => {
      catchRevert(instance.CloseAuction({ from: owner }));
    });

    it("Non-owner cannot start the commit stage", async () => {
      catchRevert(instance.StartCommitStage({ from: alice }));
    });

    it("Bids cannot yet be committed", async () => {
      catchRevert(instance.CommitNewBid(hashBob, { from: bob }));
    });
  });
});
