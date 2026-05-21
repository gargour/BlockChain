const ethers = require("hardhat").ethers;

async function main() {
  // 1. L'adresse mta3 el-contract mte3na elly t-déploya tawa berk
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  // 2. N-jibou el-contract mel-blockchain
  const DatasetRegistry = await ethers.getContractFactory("DatasetRegistry");
  const contract = await DatasetRegistry.attach(contractAddress);

  // N-jibou el-comptes mta3na (Account 0 w Account 1) bech n-jarbou bihom
  const [owner, user2] = await ethers.getSigners();

  console.log("--------------------------------------------------");
  console.log("🚀 Lancement du test de notre Smart Contract...");
  console.log("--------------------------------------------------");

  // 3. Test 1: Ajouter un Dataset
  console.log("📝 1. Ajout d'un nouveau dataset par l'Owner...");
  const tx1 = await contract.addDataset("Medical Images Dataset", "MRI and CT scans for AI training");
  await tx1.wait(); // N-stannou el-blockchain t-valydi el-bloc
  console.log("✅ Dataset ajouté avec succès !");

  // 4. Test 2: Voter (Notation) sur le Dataset
  console.log("\n⭐ 2. Vote sur le dataset (ID: 1) par l'Owner (Note: 5/5)...");
  const tx2 = await contract.rateDataset(1, 5);
  await tx2.wait();
  
  console.log("⭐ 3. Vote sur le même dataset par User2 (Note: 4/5)...");
  // N-khallou user2 houwa lli y-voti hna
  const tx3 = await contract.connect(user2).rateDataset(1, 4);
  await tx3.wait();
  console.log("✅ Les votes sont enregistrés !");

  // 5. Test 3: Récupérer la moyenne des notes
  console.log("\n📊 4. Récupération des données du Dataset...");
  const dataset = await contract.datasets(1);
  const averageRating = await contract.getAverageRating(1);

  console.log("--------------------------------------------------");
  console.log(`📋 Nom du Dataset: ${dataset.name}`);
  console.log(`👤 Créateur: ${dataset.creator}`);
  console.log(`📈 Nombre de votes: ${dataset.numberOfRatings}`);
  // El-moyenne tji mathalni 4.5 rj3naha 450 fil-code, n-9smouha 3la 100
  console.log(`⭐ Note Moyenne: ${Number(averageRating) / 100} / 5`);
  console.log("--------------------------------------------------");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });