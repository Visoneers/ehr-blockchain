import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";

import Header from "../header/Header";
import { tokens } from "../../assets/theme";
import { useParams } from "react-router-dom";
import axios from "axios";
import Prescription from "./Prescriptions";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

const Viewprescription = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { prescriptionID, userID } = useParams();

  const [prescrition, setPrescrition] = useState(null);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchPrescription = async () => {
      try {
        console.log(userID);
        const response = await axios.get(
          `http://localhost:3000/prescription/${userID}/${prescriptionID}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
          }
        );
        console.log("set prescription");
        console.log(response.data[0]);
        setPrescrition(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    console.log(prescrition,"press here too");
    // useEffect(() => {
    fetchPrescription();
    // }, []);
console.log(prescrition,"prescrpytion jere")
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  };
  return (
   
   <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="PRESCRIPTION" subtitle="View Prescription" />
      </Box>
{prescrition?
      <Box m="20px">
        <Grid
          container
          spacing={1}
          direction="row"
          backgroundColor={colors.primary[400]}
        >
          <Grid item xs={12} container padding={1}>
            <Grid item xs={8}>
              <Typography variant="h5">
                <b>Patient ID</b>:{prescrition.userId} , <b>Prescription ID</b>: {prescrition._id}
              </Typography>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={2}>
              <Typography variant="h5">
                <b>Date</b>:{formatDate(prescrition.createdAt)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={1} direction="row">
          <Grid item xs={12} container padding={1}>
            <Grid item xs={2}>
              <Typography variant="h4">
                <b>{prescrition.doctor.fullName}</b>
              </Typography>{prescrition.doctor.specialists}<br />
              <b>Nephrology</b>
              <br />MBBS<br />
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={8}>
              <Typography variant="h4">
                <b>{prescrition.hospital[0].name}</b>
              </Typography>{prescrition.hospital[0].address},{prescrition.hospital[0].city},{prescrition.hospital[0].pincode}<br />{prescrition.hospital[0].email}<br />{prescrition.hospital[0].contact}
            </Grid>
          </Grid>
        </Grid>
        <br />
        <Grid
          container
          spacing={1}
          direction="row"
          backgroundColor={colors.primary[400]}
        >
          <Grid item xs={12} container padding={1}>
            <Grid item xs={12}>
              <Typography variant="h5">
                <b>Patient Name</b>: {prescrition.user[0].name}, <b>Age</b>: {prescrition.user[0].age} Years,{" "}
                <b>Sex</b>: {prescrition.user[0].gender}, <b>Insurance Name</b>: {prescrition.user[0].insauranceName}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={1} direction="row">
          <Grid item xs={12} container padding={1} spacing={1}>
            <Grid item xs={4} border>
              <Typography variant="h5">
                <b>Patient Notes</b>: None
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <TableContainer>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Medicine Name</StyledTableCell>
                      <StyledTableCell align="right">Type</StyledTableCell>
                      <StyledTableCell align="right">Days</StyledTableCell>
                      <StyledTableCell align="right">
                        Instruction
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  {prescrition.data.map((prescription)=>(
                  <TableBody>
                    
                    
                    <StyledTableRow> 
                      
                      <TableCell>{prescription.name}</TableCell>
                      <TableCell align="right">{prescription.type}</TableCell>
                      <TableCell align="right">{prescription.days}</TableCell>
                      <TableCell align="right">{prescription.instruction}</TableCell>
                      
                    </StyledTableRow>
                    {/* <StyledTableRow>
                      <TableCell>Astimin</TableCell>
                      <TableCell align="right">Anti</TableCell>
                      <TableCell align="right">5</TableCell>
                      <TableCell align="right">None</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <TableCell>Sabril</TableCell>
                      <TableCell align="right">Bio</TableCell>
                      <TableCell align="right">5</TableCell>
                      <TableCell align="right">None</TableCell>
                    </StyledTableRow> */}
                  </TableBody>))}
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={1} direction="row">
          <Grid item xs={12} container>
            <Grid item xs={3} />
            <Grid item xs={1} />
            <Grid item xs={8}>
              <TableContainer>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Diagnosis</StyledTableCell>
                      <StyledTableCell>Instructions</StyledTableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
        <br />
        <br />
        <br />
        <Grid container spacing={1} direction="row">
          <Grid item xs={12} container>
            <Grid item xs={3} />
            <Grid item xs={1} />
            <Grid item xs={8}>
              <p id="sname" align="center">
                --------------------------------------------------------<br />Signature
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Box>:null}
    </Box>
    
  );
};

export default Viewprescription;
