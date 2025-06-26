const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const deployedAddress = "0x454A4226aB2Eee18d747D146f10cB432c2Cf9a67"; // 🟢 Use deployed address

  const MockRealEstate = await ethers.getContractFactory("MockRealEstate");
  const contract = await MockRealEstate.attach(deployedAddress);

  console.log("✅ Attached to MockRealEstate at:", contract.address);

  // Example: Call a function like mint() or owner()
  const owner = await contract.owner();
  console.log("Owner is:", owner);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
