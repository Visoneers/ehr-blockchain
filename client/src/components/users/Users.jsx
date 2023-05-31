import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from 'axios';
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import Header from '../header/Header';
import { tokens } from '../../assets/theme';
import { ReactComponent as UserIcon } from '../../assets/icons/user.svg';
import { mockDataUsers } from '../../assets/data/mockData';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useContext } from 'react';
import AuthContext from '../../context/AuthProvider';

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const { auth } = useContext(AuthContext)

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        //super admin
        console.log("logs start here")
        const role=localStorage.getItem("user_role")
        const id=localStorage.getItem("user_id")
        // console.log(role ,"local strogar")
        if (role === "644e0d8ae22255e5791984b5" ||role=="644e0ddae22255e5791984b9") {
          const response = await axios.get("http://localhost:3000/users/allUsers", {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          });
          console.log("hi")
          console.log(response.data.data)
          setUsers(response.data.data);
        }
        //society admin
        if (role === "644e0da2e22255e5791984b6") {
          const response = await axios.get("http://localhost:3000/users/getSocietyUsers", {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          });
          console.log("hi")
          console.log(response.data.data[0].paginetResult)
          setUsers(response.data.data[0].paginetResult);
        }
        //hospitaladmin doctor
        if (role === "644e0db8e22255e5791984b7") {
          console.log(auth.id)
          console.log("hospiyal user req routes")
          const response = await axios.get(`http://localhost:3000/users/hospitalUsers/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          });
          console.log("hi from hospital ")
          console.log(response.data.data)
          // response.data.data.map((row, index) => row["id"] = index);
          setUsers(response.data.data);
        
        }
console.log(users)

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
   // { field: "_id", headerName: "ID", flex: 0.5 },
    // { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "gender",
      headerName: "Gender",
      type: "string",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "mobileNo",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "society",
      headerName: "Society",
      align: "left",
      type: "string",
      valueGetter: (params) => {
        const societyName = params.row.society[0]?.name || "";
        return societyName;
      },
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
      field: "pinCode",
      headerName: "Zip Code",
      flex: 1,
    },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   sortable: false,
    //   renderCell: (params) => {
    //     const onClick = (e) => {
    //     };

    //     return <Button sx={{ backgroundColor: colors.greenAccent[500], p: "10px", borderRadius: "4px", }}>
    //       Edit
    //     </Button>;
    //   }
    // },
  ];
  
  return (
    <>
      <Box m="20px">
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="USERS" subtitle="Managing The Users" />
            <Link to={`${location.pathname}/addnewuser`} >
              <Button sx={{ fontSize: "12px", padding: "12px", backgroundColor: colors.greenAccent[500], color: colors.grey[100], }}>
                <UserIcon style={{ height: 30, width: 30, padding: 5, marginRight: 7 }} />
                add new user
              </Button>
            </Link>
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
          
          {users ? <DataGrid
            rows={users}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            // getRowId={(row) => row._id}
          />:null}
        </Box>
      </Box>
    </>
  )
}

export default Users;