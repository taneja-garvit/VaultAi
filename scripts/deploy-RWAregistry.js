const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Using deployer:", deployer.address);
  console.log("Network:", hre.network.name);

  const deployedAddress = "0xDc1Fd6267FB58A2c91B00ac4187fCd819Bf93bCb"; // 🟢 Deployed RWARegistry

  const RWARegistry = await hre.ethers.getContractFactory("RWARegistry");
  const registry = await RWARegistry.attach(deployedAddress);

  console.log("✅ Attached to RWARegistry at:", registry.address);

  // Optional: Example interaction
  // const tokenCount = await registry.totalRegistered();
  // console.log("Total RWAs registered:", tokenCount.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
