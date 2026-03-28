import { ethers } from 'hardhat';

async function main() {
  const BloodBank = await ethers.getContractFactory("BloodBank");
  const bloodBank = await BloodBank.deploy();

  await bloodBank.waitForDeployment();

  console.log(`BloodBank deployed to: ${await bloodBank.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
