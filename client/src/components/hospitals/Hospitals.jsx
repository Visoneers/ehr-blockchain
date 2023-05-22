import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import  axios from "axios"
import { ReactComponent as AdminIcon } from '../../assets/icons/admin.svg';
import Header from '../header/Header';
import { tokens } from '../../assets/theme';
import { mockDataUsers } from '../../assets/data/mockData';

const Hospitals = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [rows, setRows] = useState([]);

  const fetchHospitals = async () => {
    try {
      const response = await axios.get("http://localhost:3000/hospitals", {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      console.log("hi")
      console.log(response.data.data[0].paginetResult)
      setRows(response.data.data[0].paginetResult);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const columns = [
    { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
        };

        return <Button sx={{ backgroundColor: colors.greenAccent[500], p: "10px", borderRadius: "4px", }}>
          Delete
        </Button>;
      }
    },
  ];

  return (
    <>
      <Box m="20px">
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="HOSPITALS" subtitle="Managing The Hospital" />
            <Button sx={{ fontSize: "12px", padding: "12px", backgroundColor: colors.greenAccent[500], color: colors.grey[100], }}>
              <AdminIcon style={{ height: 30, width: 30, padding: 5, marginRight: 7 }} />
              <Link to="/admin/hospitals/addnewhospital">add new hospital</Link>
            </Button>
          </Box>
        </Box>

        <Box mt="25px" height="75vh"
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
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </Box>
    </>
  )
}

export default Hospitals;