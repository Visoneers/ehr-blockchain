import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';
// require('dotenv').config();

//using the infura.io node, otherwise ipfs requires you to run a daemon on your own computer/server. See IPFS.io docs
// const IPFS = require('ipfs-api');
// const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

// const ipfsClient = require('ipfs-http-client');

// const ProjectID = process.env.PROJECT_ID;
// const ProjectSecret = process.env.PROJECT_SECRET;

// const auth = 'Basic ' + Buffer.from(ProjectID + ':' + ProjectSecret).toString('base64');
// const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: { authorization: auth },}) 

const auth = 'Basic ' + Buffer.from('2P0ubeb6uZ3U6nnRMtj6iXblRNL:6f7cd3a8ade31a157fdebc505aa701cc').toString('base64');
const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: { authorization: auth }, }) 

//run with local daemon
// const ipfsApi = require('ipfs-api');
// const ipfs = new ipfsApi('localhost', '5001', {protocol: 'http'});

export default ipfs; 