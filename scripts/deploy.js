async function main() {
  const DatasetRegistry = await ethers.getContractFactory("DatasetRegistry");
  const datasetRegistry = await DatasetRegistry.deploy();
  await datasetRegistry.waitForDeployment();
  console.log("Contract deployed to:", await datasetRegistry.getAddress());
}
main().catch((error) => { console.error(error); process.exitCode = 1; });