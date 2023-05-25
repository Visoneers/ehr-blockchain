import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Button, IconButton, InputBase, Typography, useTheme } from "@mui/material";
import { tokens } from "../../assets/theme";
import SearchIcon from "@mui/icons-material/Search";
import axios from 'axios';

import { ImageConfig } from "../../assets/images/imageConfig";
import Header from "../header/Header";

import "./MDrecord.scss";
import "./Viewrecord.scss";

const MDRecord = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const loaction = useLocation();
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        const role=  localStorage.getItem("user_role")
//doctor
        if(role=="644e0ddae22255e5791984b9"){
          const response = await axios.get("http://localhost:3000/users/allUsers", {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });
        console.log("hi")
        console.log(response.data.data[0].paginetResult)
        setUsers(response.data.data[0].paginetResult);
      }
      //hospital
      if(role=="644e0db8e22255e5791984b7"){
        const id=localStorage.getItem("user_id")
        const response = await axios.get(`http://localhost:3000/users/hospitalUsers/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      console.log("hi")
      console.log(response.data.data)
      setUsers(response.data.data);
    }
      } catch (error) {
        console.error(error);
      }
    }
console.log(users)
    // useEffect(() => {
      fetchUsers();
    // }, []);

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [])

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
      
     {users.map((user)=>(
      <Box key={user._id} alignItems="Center" className="mdrecord">
        <Box className="account" backgroundColor={colors.primary[400]} m="25px">
          <div className="account-item">
            <div className="acount-item-info">
              <img src={ImageConfig['default']} alt="" />
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", margin: "10px" }}>
                <Typography variant="h3" color={colors.grey[100]}>{user.name}</Typography>
                <Typography variant="h5" color={colors.greenAccent[300]}>{user._id}</Typography>
              </Box>
            </div>
            <div className="account-item-action">
              <Button sx={{ fontSize: "14px", padding: "10px", backgroundColor: colors.blueAccent[500], color: colors.grey[100], }}>
                <Link to={`prescriptions/${user._id}`}>View Prescription</Link>
              </Button>
              <Button sx={{ fontSize: "14px", padding: "10px", backgroundColor: colors.blueAccent[500], color: colors.grey[100], }}>
                <Link to={`addprescription/${user._id}`}>Add Prescription</Link>
              </Button>
              <Button sx={{ fontSize: "14px", padding: "10px", backgroundColor: colors.blueAccent[500], color: colors.grey[100], }}>
                <Link to={`${loaction.pathname}/123456789`}>{ loaction.pathname === "/doctor/update" ? "Update Medical Record" : "View Medical Record"}</Link>
              </Button>
            </div>
          </div>
        </Box>
      </Box>
   )) }
    </>
  );
};
export default MDRecord;
