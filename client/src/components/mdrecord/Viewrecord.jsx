import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import { Box, Button, IconButton, InputBase, Typography, useTheme, Grid, Paper } from "@mui/material";
import WcIcon from '@mui/icons-material/Wc';
import {Types} from "mongoose"
import { ImageConfig } from "../../assets/images/imageConfig";
import { LoadBlockchainData } from "../../api/web3";
import { tokens } from "../../assets/theme";
import axios from 'axios';
import BigNumber from 'bignumber.js';
import Prescription from '../prescription/Prescriptions';
import { ReactComponent as UserIcon } from '../../assets/icons/user.svg';
const Viewrecord = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [profile,setProfile]=useState()
  const [filteredFiles, setFilteredFiles] = useState(null)
  const [files, setFiles] = useState(null);
const {userID}=useParams()
console.log(userID,"g=from view medical recodrds")

useEffect(() => {
  let isMounted = true;
  const controller = new AbortController();

  const fetchPrescription = async () => {
    try {
      console.log(userID);
      const response = await axios.get(
        `http://localhost:3000/users/${userID}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );
      console.log("set prescription");
      console.log(response.data.data[0],"user data");
      setProfile(response.data.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  fetchPrescription();
  // }, []);
console.log(profile)
  return () => {
    isMounted = false;
    controller.abort();
  };
}, []);
  useEffect(() => {
    (async () => {
      let file = await LoadBlockchainData();
      if(file){
        setFiles(file)
      }
      
      const filtereddata = file.filter((filedata) =>{
         const mongoID=BigNumber(filedata.userId).toString(16)
         console.log(mongoID)
         return mongoID === userID
        }
      );
      setFilteredFiles(filtereddata)
    })();
  },[]);
  console.log(files,"user file")
  return (
    <Box m="20px">
       <Link to="http://localhost:5000">
          <Button sx={{ fontSize: "12px", padding: "12px", backgroundColor: colors.greenAccent[500], color: colors.grey[100], }}>
            <UserIcon style={{ height: 30, width: 30, padding: 5, marginRight: 7 }} />
                Predict Disease
          </Button>
       </Link>
      {profile? <Box mb="20px" sx={{ border: '1px solid grey', padding:"20px", borderRadius: "8px"}}>
        <Grid container border='none'>
          <Grid item lg={12} xs={12}>
            <div className="head">
              <h1>{profile.name}</h1>
              <div className="head-details">
                <Paper className="detail-card" elevation={0} square>
                  <p id='border'>22</p>
                  <div className="card-date">
                    <p id='dob'>Date Of Birth</p>
                    <p id='date'>24/05/2000</p>
                  </div>
                </Paper>
                <Paper className="detail-card" elevation={0} square>
                  <WcIcon fontSize='large' />Male
                </Paper>
              </div>
            </div>
            <Grid container className="row1">
              <Grid item lg={6} md={6} xs={12} paddingRight={2}>
                <h3 id='heading'>Address</h3>
                <p id='sub-heading'>Ganesh Peth</p>
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <h3 id='heading'>Vaccinated</h3>
                <p id='sub-heading'>Yes</p>
              </Grid>
            </Grid>
            <Grid container className="row1">
              <Grid item lg={4} md={4} xs={12} paddingRight={2}>
                <h3 id='heading'>Society</h3>
                <p id='sub-heading'>Antariksh Society</p>
              </Grid>
              <Grid item lg={4} md={4} xs={12} paddingRight={2}>
                <h3 id='heading'>City</h3>
                <p id='sub-heading'>Pune</p>
              </Grid>
              <Grid item lg={4} md={4} xs={12}>
                <h3 id='heading'>Covid</h3>
                <p id='sub-heading'>No</p>
              </Grid>
            </Grid>
            <br />
            <h2>IN CASE OF EMERGENCY</h2>
            <Grid container className="row1">
              <Grid item lg={6} md={6} xs={12} paddingRight={2}>
                <h3 id='heading'>YOUR GUARDIAN</h3>
                <p id='sub-heading'>Pranit Bhunia</p>
                <h3 id='heading'>ADDRESS</h3>
                <p id='sub-heading'>Ganesh Peth</p>
                <h3 id='heading'>Mobile No</h3>
                <p id='sub-heading'>+91 7030523083</p>
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <h3 id='heading'>YOUR PROVIDER</h3>
                <p id='sub-heading'>K.E.M<br /></p>
                <p><br /></p>
                <h3 id='heading'>ADDRESS</h3>
                <p id='sub-heading'>Mangalwar Peth</p>
              </Grid>
            </Grid>
            <br />
            <h2>ALLERGIES</h2>
            <Grid container className="row1">
              {/* {
              item?.allergies.map((item) => (
                <Grid key={Math.random()} item lg={6} md={6} xs={12} paddingRight={2}>
                  <h3 id='heading'>ALLERGIES</h3>
                  <p id='sub-heading'>{item}</p>
                </Grid>
              ))
            } */}
              <Grid key={Math.random()} item lg={6} md={6} xs={12} paddingRight={2}>
                <h3 id='heading'>ALLERGIES</h3>
                <p id='sub-heading'>No</p>
              </Grid>
            </Grid>
            <br />
            <h2>MEDICAL HISTORY</h2>
            <Grid container className="row1">
              {/* {
              item?.diseases.map(item => (
                <Grid key={Math.random()} item lg={6} md={6} xs={12} paddingRight={2}>
                  <h3 id='heading'>DISEASES</h3>
                  <p id='sub-heading'>{item}</p>
                </Grid>
              ))
            } */}
              <Grid key={Math.random()} item lg={6} md={6} xs={12} paddingRight={2}>
                <h3 id='heading'>DISEASES</h3>
                <p id='sub-heading'>No</p>
              </Grid>
            </Grid>
            <Grid container className="row1">
              {/* {
              item?.symptoms.map(item => (
                <Grid key={Math.random()} item lg={6} md={6} xs={12} paddingRight={2}>
                  <h3 id='heading'>SYMPTOMS</h3>
                  <p id='sub-heading'>{item}</p>
                </Grid>
              ))
            } */}
              <Grid key={Math.random()} item lg={6} md={6} xs={12} paddingRight={2}>
                <h3 id='heading'>SYMPTOMS</h3>
                <p id='sub-heading'>No</p>
              </Grid>
            </Grid>
            <br />
            <h2>MEDICAL INSURANCE</h2>
            <Grid container className="row1">
              <Grid item lg={6} md={6} xs={12} paddingRight={2}>
                <h3 id='heading'>Name of Insurance Company</h3>
                <p id='sub-heading'>Star Health Insurance</p>
                <h3 id='heading'>Policy Number</h3>
                <p id='sub-heading'>123456978</p>
                <h3 id='heading'>Policy Type:</h3>
                <p id='sub-heading'></p>
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <h3 id='heading'>ADDRESS</h3>
                <p id='sub-heading'>New Delhi</p>
                <h3 id='heading'>Expiry Date:</h3>
                <p id='sub-heading'>05/02/2024</p>
                <h3 id='heading'>Policy Limit:</h3>
                <p id='sub-heading'>5,00,000</p>
              </Grid>
            </Grid>
            <h2>LIST ANY MEDICATION TAKEN REGULARLY:</h2>
            {/* {
            item?.medicines.map(item => (
              <Grid key={Math.random()} item lg={6} md={6} xs={12} paddingRight={2}>
                <h3 id='heading'>Medicines</h3>
                <p id='sub-heading'>{item}</p>
              </Grid>
            ))
          } */}
            <Grid key={Math.random()} item lg={6} md={6} xs={12} paddingRight={2}>
              <h3 id='heading'>Medicines</h3>
              <p id='sub-heading'>No</p>
            </Grid>
          </Grid>
        </Grid>
      </Box>:null}
      
      <b />
      <Typography variant="h3">Medical Records</Typography>
      {
        filteredFiles ? (
          filteredFiles.map((data, index) => {
            return(
            <Box alignItems="Center" key={ index}>
              <Box className="account" backgroundColor={colors.primary[400]}>
                <div className="account-item">
                  <div className="acount-item-info">
                    <img src={ImageConfig[data?.fileType?.split('/')[1]] || ImageConfig['default']} alt="" />
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", margin: "10px" }}>
                      <Typography variant="h3" color={colors.grey[100]}>{data?.fileDescription}</Typography>
                      <Typography variant="h5" color={colors.greenAccent[300]}>{data?.fileName}</Typography>
                    </Box>
                  </div>
                  <div className="account-item-action">
                    <Button sx={{ fontSize: "14px", padding: "10px", backgroundColor: colors.greenAccent[500], color: colors.grey[100], }}>
                    <Link to={"https://ipfs.io/ipfs/" + data?.fileHash}>View</Link>
                    </Button>
                  </div>
                </div>
              </Box>
            </Box>
            )
          })
        ) : null
      }
      <br />
    </Box>
  )
}

export default Viewrecord;