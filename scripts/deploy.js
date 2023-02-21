const hre = require("hardhat");

async function main() {
  const certificate = await hre.ethers.getContractFactory("certificate");
  const contrDep = await certificate.deploy("Beyond", "BIT");
  await contrDep.deployed();
  const contAddr = contrDep.address;
  console.log(contAddr);
  const { hash } = contrDep.deployTransaction;
  console.log(hash);
  // console.log(contrDep);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
