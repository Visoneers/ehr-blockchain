import React from 'react';

import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../assets/theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", margin: "10px"}}>
      <Typography
        variant="h4"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0"}}
      >
        {title}
      </Typography>
      <Typography variant="h5">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
