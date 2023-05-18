import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";

import { ImageConfig } from "../../assets/images/imageConfig";
import Header from '../header/Header';
import { tokens } from "../../assets/theme";

const Prescription = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="PRESCRIPTIONS" subtitle="Prescription List" />
      </Box>

      <Box alignItems="Center" className="mdrecord">
        <Box className="account" backgroundColor={colors.primary[400]} m="25px">
          <div className="account-item">
            <div className="acount-item-info">
              <img src={ImageConfig['default']} alt="" />
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", margin: "10px" }}>
                <Typography variant="h3" color={colors.grey[100]}>Prasun Bhunia</Typography>
                <Typography variant="h5" color={colors.greenAccent[300]}>12/05/2023</Typography>
              </Box>
            </div>
            <div className="account-item-action">
              <Button sx={{ fontSize: "14px", padding: "10px", backgroundColor: colors.blueAccent[500], color: colors.grey[100], }}>
                <Link to="123456789">View</Link>
              </Button>
            </div>
          </div>
        </Box>
      </Box>
    </Box>
  )
}

export default Prescription;