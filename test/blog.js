const Blog = artifacts.require("./Blog.sol");
const truffleAssert = require('truffle-assertions');

contract("Blog", accounts => {

  let blogInstance;

  before(async function () {
    blogInstance = await Blog.deployed();
  });

  it("should publish submission", async () => {
    await blogInstance.publishSubmission("content", "title", 0, { from: accounts[0], value: web3.utils.toWei("0.05", "ether") });
    assert.equal(await blogInstance.getSubmissionsLength(), 1, "Submission wasn't published");
  });

  it("should let user reward a submission", async () => {
    await blogInstance.rewardSubmission(1, { from: accounts[1], value: web3.utils.toWei("0.001", "ether") }).then(async () => {
      await blogInstance.getSubmission(1).then(async (res) => {
        assert.equal(web3.utils.toWei("0.001", "ether"), res[5], "Reward wasn't updated");
      })
    })
  });

  it("should only let owner withdraw", async () => {
    await truffleAssert.reverts(
      blogInstance.withdraw(0, { from: accounts[1] }),
      "Only owner can call this function");
  });

  it("should only let owner get contract balance", async () => {
    await truffleAssert.reverts(
      blogInstance.getContractBalance({ from: accounts[1] }),
      "Only owner can call this function");
  });

  it("should change post creation cost", async () => {
    let newCost = web3.utils.toWei("0.5", "ether");
    await blogInstance.changePostCreationCost(newCost)
      .then(async () => {
        blogInstance.postCreationCost().then(async (res) => {
          assert.equal(res, newCost, "Cost didn't change");
        });
      });
  });

});
