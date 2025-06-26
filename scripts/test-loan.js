const hre = require("hardhat");

const VAULT_ADDRESS = "0xb48DA5487F1A9664B82820d7b19E09b57c2acca5"; // Replace with your actual VaultCore address

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Using deployer:", deployer.address);

  const VaultCore = await hre.ethers.getContractAt("VaultCore", VAULT_ADDRESS);

  const assetId = 1;
  const amount = hre.ethers.parseEther("2"); // >1 ETH triggers unhealthy loan

  const tx = await VaultCore.receiveLoanApproval(assetId, amount);
  await tx.wait();

  console.log("✅ Unhealthy loan simulated");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
