import React from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../assets/theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase,percentage }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px" display="flex" justifyContent="space-between" alignItems="center" >

      <Box display="flex" justifyContent="space-between" flexDirection='column' mt="2px">
      <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ color: colors.grey[200] }}
          >
            {title}
          </Typography>
        <Typography display="flex" variant="h4" mt="20px" sx={{ color: colors.grey[500] }}>
          <Box mr="10px">{icon}</Box>
          <Box >{subtitle}</Box>
          
          
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
        >
          {increase}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
       
       <Box>
         <ProgressCircle title={progress*100}size="100" progress={progress} />
       </Box>
     </Box>
    </Box>
  );
};

export default StatBox;
