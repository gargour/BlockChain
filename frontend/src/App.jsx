import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// 🚨 REMPLIEZ AVEC L'ADRESSE DU CONTRAT APRES LE DEPLOY
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const CONTRACT_ABI = [
  "function registerDataset(string _name, string _description) public payable",
  "function getDatasets() public view returns (tuple(string name, string description, address owner, uint256 timestamp, uint256 amount)[])"
];

function App() {
  const [datasets, setDatasets] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('0');

  const loadData = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      const data = await contract.getDatasets();
      setDatasets(data);
    } catch (e) { console.error("Erreur chargement:", e); }
  };

  const publish = async (e) => {
    e.preventDefault();
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      
      const tx = await contract.registerDataset(name, description, {
        value: ethers.parseEther(amount || "0")
      });
      await tx.wait();
      loadData();
    } catch (e) { console.error("Erreur publication:", e); }
  };

  useEffect(() => { loadData(); }, []);

  return (
    <div style={{color:'white', background:'#1a1a1a', padding:40, minHeight:'100vh'}}>
      <h1>Dataset Registry</h1>
      <form onSubmit={publish} style={{marginBottom:30}}>
        <input placeholder="Nom" onChange={e => setName(e.target.value)} />
        <input placeholder="Description" onChange={e => setDescription(e.target.value)} />
        <input placeholder="Montant ETH" onChange={e => setAmount(e.target.value)} />
        <button type="submit">Publier</button>
      </form>

      {datasets.map((d, i) => (
        <div key={i} style={{ border: '1px solid #555', margin: '10px', padding: '15px', borderRadius:8 }}>
          <h4>{d.name}</h4>
          <p>{d.description}</p>
          <small>
            👤 Propriétaire: {d.owner.substring(0, 6)}... <br />
            ⏰ Date: {new Date(Number(d.timestamp) * 1000).toLocaleString()} <br />
            💰 Don: {ethers.formatEther(d.amount)} ETH
          </small>
        </div>
      ))}
    </div>
  );
}
export default App;