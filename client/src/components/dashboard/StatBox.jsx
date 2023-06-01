import React from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../assets/theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ color: colors.grey[200] }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle size="100" progress={progress} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" flexDirection='row' mt="2px">
        <Typography display="flex" justifyContent="space-between" variant="h4" sx={{ color: colors.grey[500] }}>
          <Box mr="10px">{icon}</Box>
          <Box>{subtitle}</Box>
          
          
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
