const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DatasetRegistryModule", (m) => {
  // On déploie le contrat DatasetRegistry
  const datasetRegistry = m.contract("DatasetRegistry", []);

  return { datasetRegistry };
});