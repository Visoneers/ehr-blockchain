import React, { useState, useRef } from "react";
import Web3 from 'web3';
import { Buffer } from "buffer";
import { Box, Button, IconButton, InputBase, Typography, useTheme } from "@mui/material";
import { tokens } from "../../assets/theme";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ImageConfig } from "../../assets/images/imageConfig";
import { BigNumber } from 'bignumber.js';

import MDStorage from '../../abis/MDStorage.json'
import ipfs from "../../api/ipfs";
import Header from "../header/Header";

import './MDupdate.scss';
import { useParams } from "react-router-dom";

const MDupdate = ({account}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [file, setFile] = useState(null);
  let {userID}=useParams()
  const wrapperRef = useRef(null);

  const onDragEnter = () => wrapperRef.current.classList.add('dragover');

  const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

  const onDrop = () => wrapperRef.current.classList.remove('dragover');

  const captureFile = (event) => {
    event.preventDefault()

    const data = event.target.files[0]
    const reader = new window.FileReader()

    reader.readAsArrayBuffer(data)
    reader.onloadend = () => {
      setFile({
        buffer: Buffer(reader.result),
        type: data.type,
        name: data.name,
        description: file?.description
      })
      console.log("Buffer data: ", Buffer(reader.result));
    }
  }
  const uploadFile = async () => {

    console.log("Submitting file to IPFS...")
    const web3 = new Web3(window.ethereum)
    console.log(file);
    console.log(account);
    const networkId = await web3.eth.net.getId()
    const networkData = await MDStorage.networks[networkId]

    if (networkData) {
      // Assign contract
      const mdstorage = new web3.eth.Contract(MDStorage.abi, networkData.address)

      // Assign value for the file without extension
      if (file.type === '') {
        setFile({ ...file, 'type': 'none' })
      }
      console.log(file);
      
      // Add file to the IPFS
      const added = await ipfs.add(file.buffer);
      console.log(added)
      if (!web3.utils.isAddress(account.toString())) {
        // Handle invalid Ethereum address
        console.log('Invalid Ethereum address:', account.toString());
        return;
      }
      console.log(BigNumber(userID,16).toString(10))
      const userIDString = new BigNumber(userID,16).toString(10);

      console.log(userIDString)
      mdstorage.methods.uploadFile(userIDString, added?.path, added?.size, file.type, file.name, file.description).send({ from: `${account.toString()}` }).on('transactionHash', (hash) => {
        window.location.reload()
      }).on('error', (e) => {
        window.alert('Error')
      })
    } else {
      window.alert('DStorage contract not deployed to detected network.')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    uploadFile()
    setFile(null)
  }

  return (
    <>
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="UPDATE MEDICAL RECORDS" subtitle="View medical records" />
          <Box
            display="flex"
            sx={{ width: 250, borderRadius: "3px" }}
            backgroundColor={colors.primary[400]}
          >
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
        <Box display='flex' justifyContent="center" mt='30px'>
          <form className="update-from" onSubmit={handleSubmit}>
            <Typography variant="h4" color={colors.grey[100]}>Description</Typography>
            <InputBase className="file-description" sx={{backgroundColor: colors.primary[400]}} type="text" onChange={(e) => setFile({ ...file, 'description': e.target.value })} placeholder="description..." required />
            <Typography variant="h4" color={colors.grey[100]}>Upload File</Typography>
            <div
              ref={wrapperRef}
              className="drop-fileinput"
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              style={{backgroundColor: colors.primary[400]}}
            >
              <div className="drop-fileinput-label" style={{backgroundColor: colors.primary[400]}}>
                <CloudUploadIcon sx={{ fontSize: "70px"}} />
                <p>Drag & Drop your files here</p>
              </div>
              <input type="file" name="data" onChange={captureFile} />
            </div>

            {
              file ? (
                <div className="drop-file-preview">
                  <Typography variant="h4" color={colors.grey[100]}>Ready to upload</Typography>
                  <div className="drop-file-preview-item">
                    <img src={ImageConfig[file?.type?.split('/')[1]] || ImageConfig['default']} alt="" />
                    <div className="drop-file-preview-item-info">
                      <Typography variant="h4" color={colors.grey[100]}>{file?.name}</Typography>
                      <Typography variant="h5" color={colors.grey[100]}>{file?.description}</Typography>
                    </div>
                    <IconButton type="button" sx={{ p: 1 }} onClick={() => { setFile(null) }}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              ) : null
            }
            <Button sx={{
              backgroundColor: colors.greenAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              padding: "10px 20px",
              width: "150px"
            }} type="submit">Upload file</Button>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default MDupdate;
