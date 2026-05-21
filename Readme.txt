# Dataset Registry - DApp Blockchain

Projet de fin de TP : Application décentralisée pour l'enregistrement de jeux de données avec contribution (don) en ETH.

## Stack Technique
- **Smart Contract:** Solidity (0.8.0)
- **Développement:** Hardhat
- **Interface:** React + Ethers.js
- **Network:** Localhost (Hardhat Node)

## Installation
1. Cloner le dépôt : `git clone "https://github.com/gargour/BlockChain "`
2. Installer les dépendances : `npm install`
3. Compiler le contrat : `npx hardhat compile`


##Lien Drive DEMO 
""
## Utilisation
1. Lancer le nœud local : `npx hardhat node`
2. Dans un nouveau terminal, déployer le contrat : `npx hardhat run scripts/deploy.js --network localhost`
3. Copier l'adresse retournée et la mettre dans `src/App.jsx` (variable `CONTRACT_ADDRESS`).
4. Lancer l'interface : `npm run dev`
5. Ouvrir `http://localhost:5173` et interagir via MetaMask (réseau Hardhat Local).