const Web3 = require("web3");

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const PUBLIC_KEY = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
const PUBLIC_KEY_2 = "0x872449c44937f6Ac266cbBCDCb189B25AcEBb9E9";
const TOKEN_ID = 1;

async function viewNFT() {
  const web3 = new Web3("http://localhost:8545");
  const contract = require("../artifacts/contracts/NFT.sol/NFT.json");
  const nftContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS);
  // Display the PUBLIC_KEY's balance of id:1 token.
  nftContract.methods.balanceOf(PUBLIC_KEY, TOKEN_ID).call().then(console.log);
  nftContract.methods.balanceOf(PUBLIC_KEY_2, TOKEN_ID).call().then(console.log);
}

viewNFT();
