const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("DecentralBank", ([owner, customer]) => {
  let tether, rwd, decentralBank;

  const tokens = (number) => {
    return web3.utils.toWei(number, "ether");
  };

  before(async () => {
    // Load contracts
    tether = await Tether.new();
    rwd = await RWD.new();
    decentralBank = await DecentralBank.new(rwd.address, tether.address);

    // Trsanfer 1 million rwd to DecentralBank
    await rwd.transfer(decentralBank.address, tokens("1000000"));

    // Transfer 100 Mock Tethers to customer
    await tether.transfer(customer, tokens("100"), { from: owner });
  });

  // Testing code goes here
  describe("Mock Tether Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await tether.name();
      assert.equal(name, "Mock Tether Token");
    });
  });

  describe("Reward Token Deployment- RWD", async () => {
    it("matches name successfully", async () => {
      const name = await rwd.name();
      assert.equal(name, "Reward Token");
    });
  });

  describe("Decentral Bank Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await decentralBank.name();
      assert.equal(name, "Decentral Bank");
    });

    it("contract has tokens", async () => {
      let balance = await rwd.balanceOf(decentralBank.address);
      assert.equal(balance, tokens("1000000"));
    });
  });

  describe("Yield farming", async () => {
    it("rewards tokens for staking", async () => {
      let result;

      //  check investor balance
      result = await tether.balanceOf(customer);
      assert.equal(
        result.toString(),
        tokens("100"),
        "customer mock wallet balance before staking"
      );

      // check staking for customer
      await tether.approve(decentralBank.address, tokens("100"), {
        from: customer,
      });
      await decentralBank.depositTokens(tokens("100"), { from: customer });

      // check updated balance of customer
      result = await tether.balanceOf(customer);
      assert.equal(
        result.toString(),
        tokens("0"),
        "customer mock wallet balance after staking"
      );

      // check Decentral Bank updated balance
      result = await tether.balanceOf(decentralBank.address);
      assert.equal(
        result.toString(),
        tokens("100"),
        "Decentral Bank balance after staking from customer"
      );

      // is staking update
      result = await decentralBank.isStaking(customer);
      assert.equal(
        result.toString(),
        "true",
        "customer is staking status equals true"
      );

      //issue tokens
      await decentralBank.issueTokens({ from: owner });

      // ensure only owner can issue tokens
      await decentralBank.issueTokens({ from: customer }).should.be.rejected;

      // unstake tokens
      await decentralBank.unstakeTokens({ from: customer });

      // check unstaking balances
      // check updated balance of customer
      result = await tether.balanceOf(customer);
      assert.equal(
        result.toString(),
        tokens("100"),
        "customer wallet balance after unstaking"
      );

      // check Decentral Bank updated balance
      result = await tether.balanceOf(decentralBank.address);
      assert.equal(
        result.toString(),
        tokens("0"),
        "Decentral Bank balance after staking from customer"
      );

      // is staking update
      result = await decentralBank.isStaking(customer);
      assert.equal(
        result.toString(),
        "false",
        "customer is staking status equals false"
      );
    });
  });
});
