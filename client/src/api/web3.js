import MDStorage from '../abis/MDStorage.json';
import Web3 from 'web3';

export const LoadBlockchainData = async () => {
  let data = [];
  window.web3 = new Web3(window.ethereum);
  const web3 = window.web3;
  const networkId = await web3.eth.net.getId();
  const networkData = MDStorage.networks[networkId];

  if (networkData) {
    // Assign contract
    const mdstorage = new web3.eth.Contract(MDStorage.abi, networkData.address);
    // setMDstorage(data)
    // Get files amount
    const filecount = await mdstorage.methods.fileCount().call();
    // setFilecount(count)
    // Load files&sort by the newest
    for (var i = filecount; i >= 1; i--) {
      const file = await mdstorage.methods.files(i).call();
      data = [...data, file];
    }
  } else {
    window.alert("MDStorage contract not deployed to detected network.");
  }
  return data;
};