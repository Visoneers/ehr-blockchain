import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme, Table, TableBody, TableHead, TableCell, TableRow, Button } from "@mui/material";
import { tokens } from "../../assets/theme";
import { mockAppointments } from "../../assets/data/mockData";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import IndiaIcon from '../../assets/images/india.png';
import Header from "../header/Header";
import LineChart from "./LineChart";
import GeographyChart from "./GeographyChart";
import StatBox from "./StatBox";
import axios from 'axios';
import Prescription from '../prescription/Prescriptions';
import SickIcon from '@mui/icons-material/Sick';

const headCells = [
  { id: "first_name", label: "Name", align: "" },
  { id: "date", label: "Date", align: "" },
  { id: "time", label: "Time", align: "" },  
  { id: "actions", label: "Actions", align: "center" },

];
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const userId=localStorage.getItem("user_id")
  const userRole=localStorage.getItem("user_role")
  const [toPrescriptionDiseases,setTopPrescritionDiseases]=useState()
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
  
    const fetchPrescription = async () => {
      try {
        console.log(userId);
        const response = await axios.get(
          `http://localhost:3000/prescription/topDieases/${userId}/${userRole}`,
       
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            
          }
        );
        console.log("set prescription");
        console.log(response.data.data,"user data");
        setTopPrescritionDiseases(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    // useEffect(() => {
    fetchPrescription();
    // }, []);
  
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
// if(toPrescriptionDiseases[0]?.diseases){
//   console.log(toPrescriptionDiseases[0]?.diseases)
// }
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
       <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
         <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          
        >
          {
          toPrescriptionDiseases? toPrescriptionDiseases[0]?.diseases[0] ?
          <StatBox
          subtitle={toPrescriptionDiseases[0].diseases[0]?.count}
          title={toPrescriptionDiseases[0].diseases[0]?._id}
          progress={toPrescriptionDiseases[0].diseases[0]?.count/toPrescriptionDiseases[0].total}
          
        
          icon={
            <SickIcon
              sx={{ color: colors.grey[600], fontSize: "26px" }}
            />
        }
      />
      :null:null
    }

        </Box> 
         <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {
          toPrescriptionDiseases? toPrescriptionDiseases[0]?.diseases[1]?
          <StatBox
            subtitle={toPrescriptionDiseases[0]?.diseases[1]?.count}
            title={toPrescriptionDiseases[0]?.diseases[1]?._id}
            progress="0.30"
            
            icon={
              <SickIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          :null:null
        }
        </Box> 
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {toPrescriptionDiseases ? toPrescriptionDiseases[0]?.diseases[2]?
          <StatBox
            subtitle={toPrescriptionDiseases[0]?.diseases[2]?.count}
            title={toPrescriptionDiseases[0]?.diseases[2]?._id}
            progress="0.30"
            
            icon={
              <SickIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          :null:null
        }
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {toPrescriptionDiseases ? toPrescriptionDiseases[0]?.diseases[3]?
          <StatBox
            subtitle={toPrescriptionDiseases[0]?.diseases[3]?.count}
            title={toPrescriptionDiseases[0]?.diseases[3]?._id}
            progress="0.30"
            
            icon={
              <SickIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          :null:null
        }
        </Box>
       {/* <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          
          {toPrescriptionDiseases[0]?.diseases[3]?
          <StatBox
            subtitle={toPrescriptionDiseases[0]?.diseases[3]?.count}
            title={toPrescriptionDiseases[0]?.diseases[3]?._id}
            progress="0.30"
            
            icon={
              <SickIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />:null}
        </Box>   */}

         {/* ROW 2  */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Covid Cases
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Appointments
            </Typography>
          </Box>
          <Table >
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id} sx={{ fontSize: "14px", fontWeight: 550}}>
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {mockAppointments.map((item) => (
                <TableRow key={item.id}>
                  <TableCell sx={{ fontSize: "14px" }}>{item.first_name}</TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>{item.date}</TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>{item.time}</TableCell>
                  <TableCell align="center" sx={{ fontSize: "12px" }}>
                    <Button sx={{ fontSize: "12px", padding: "12px", backgroundColor: colors.greenAccent[500], color: colors.grey[100],}}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box> */}

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Covid Cases
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                685,412,518
              </Typography>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
    
        </Box>
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
    
        </Box>
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
    
        </Box>
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
    
        </Box>
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
    
        </Box>
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
    
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
