const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", deployer.address);
  console.log("Network:", hre.network.name);

  const RWARegistry = await hre.ethers.getContractFactory("RWARegistry");
  const registry = await RWARegistry.deploy();
  await registry.deployed();
  console.log("✅ RWARegistry deployed at:", registry.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
