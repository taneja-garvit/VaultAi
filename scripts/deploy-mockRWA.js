const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying MockRealEstate with:", deployer.address);

  const MockRealEstate = await ethers.getContractFactory("MockRealEstate");
  const contract = await MockRealEstate.deploy(deployer.address); // ✅ pass owner

  await contract.deployed();
  console.log("MockRealEstate deployed at:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
