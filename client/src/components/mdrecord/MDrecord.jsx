import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { Box, Button, IconButton, InputBase, Typography, useTheme } from "@mui/material";
import { tokens } from "../../assets/theme";
import SearchIcon from "@mui/icons-material/Search";


import { ImageConfig } from "../../assets/images/imageConfig";
import Header from "../header/Header";

import "./MDrecord.scss";
import "./Viewrecord.scss";

const MDRecord = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const loaction = useLocation();


  return (
    <>
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="MEDICAL RECORDS" subtitle="View medical records" />
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
      </Box>

      {/* Card */}
      <Box alignItems="Center" className="mdrecord">
        <Box className="account" backgroundColor={colors.primary[400]} m="25px">
          <div className="account-item">
            <div className="acount-item-info">
              <img src={ImageConfig['default']} alt="" />
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", margin: "10px" }}>
                <Typography variant="h3" color={colors.grey[100]}>Prasun Bhunia</Typography>
                <Typography variant="h5" color={colors.greenAccent[300]}>#13673712476</Typography>
              </Box>
            </div>
            <div className="account-item-action">
              <Button sx={{ fontSize: "14px", padding: "10px", backgroundColor: colors.blueAccent[500], color: colors.grey[100], }}>
                <Link to="prescriptions/12345212">View Prescription</Link>
              </Button>
              <Button sx={{ fontSize: "14px", padding: "10px", backgroundColor: colors.blueAccent[500], color: colors.grey[100], }}>
                <Link to="addprescription/123456789">Add Prescription</Link>
              </Button>
              <Button sx={{ fontSize: "14px", padding: "10px", backgroundColor: colors.blueAccent[500], color: colors.grey[100], }}>
                <Link to={`${loaction.pathname}/123456789`}>{ loaction.pathname === "/doctor/update" ? "Update Medical Record" : "View Medical Record"}</Link>
              </Button>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
};
export default MDRecord;
