import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../header/Header";
import { tokens } from "../../assets/theme";
import { mockDataDoctor } from "../../assets/data/mockData";
import { ReactComponent as UserIcon } from '../../assets/icons/user.svg';
import axios from 'axios';


const Doctors = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
const [doctors,setDoctors]=useState([])
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        const hospitalId=localStorage.getItem("user_id")
        console.log("hospiata doctor req")
        const response = await axios.get(`http://localhost:3000/doctor/${hospitalId}`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });
        console.log("hi")
        console.log(response.data.data)
        setDoctors(response.data.data);
       console.log(doctors)
      } catch (error) {
        console.error(error);
      }
    }

    // useEffect(() => {
      fetchUsers();
    // }, []);

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [])


  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "mobileNo",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "specialists",
      headerName: "Medical specialists",
      flex: 1,
      renderCell: ({ row: { specialist } }) => {
        return (
          <Box
            minWidth="180px"
            m="0"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={ colors.greenAccent[700] }
            borderRadius="4px"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px", fontSize: "14px" }}>
              {specialist}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DOCTOR LIST" subtitle="Managing the Members" />
        <Link to={`${location.pathname}/addnewdoctor`}>
          <Button sx={{ fontSize: "12px", padding: "12px", backgroundColor: colors.greenAccent[500], color: colors.grey[100], }}>
            <UserIcon style={{ height: 30, width: 30, padding: 5, marginRight: 7 }} />
            Add Doctor
          </Button>
        </Link>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
       {doctors? <DataGrid 
        checkboxSelection 
        rows={doctors} 
        columns={columns} 
        sx={{ fontSize: "14px" }}/>:null}
      </Box>px
    </Box>
  );
};

export default Doctors;
