const Web3 = require("web3");

// ADDRESS, KEY and URL are examples.
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const PUBLIC_KEY = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
const PROVIDER_URL = "http://localhost:8545";
const TOKEN_ID = 1;
const RECEPIENT_ADDRESS = "0x872449c44937f6Ac266cbBCDCb189B25AcEBb9E9";

async function transferNFT() {
  const web3 = new Web3(PROVIDER_URL);
  const contract = require("../artifacts/contracts/NFT.sol/NFT.json");
  const nftContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS);
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest");
  const tx = {
    from: PUBLIC_KEY,
    to: CONTRACT_ADDRESS,
    nonce: nonce,
    gas: 500000,
    // Transfer three of PUBLIC_KEY's id:1 token to RECEPIENT_ADDRESS.
    data: nftContract.methods
      .safeTransferFrom(PUBLIC_KEY, RECEPIENT_ADDRESS, TOKEN_ID, 1, [])
      .encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(
    tx,
    // Test account's fixed private key in hardhat local node
    process.env.PRIVATE_KEY
  );
  signPromise
    .then((signedTx) => {
      const tx = signedTx.rawTransaction;
      if (tx !== undefined) {
        web3.eth.sendSignedTransaction(tx, function (err, hash) {
          if (!err) {
            console.log("The hash of your transaction is: ", hash);
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        });
      }
    })
    .catch((err) => {
      console.log("Promise failed:", err);
    });
}

transferNFT();
