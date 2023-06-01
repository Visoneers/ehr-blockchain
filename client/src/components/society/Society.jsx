import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../header/Header";
import { tokens } from "../../assets/theme";
import { ReactComponent as UserIcon } from '../../assets/icons/user.svg';
import axios from 'axios';


const Society = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const location = useLocation();
    const [society, setSociety] = useState([])
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchUsers = async () => {
            try {
                const societyId = localStorage.getItem("user_id")
                console.log("hospiata doctor req")
                const response = await axios.get(`http://localhost:3000/society/`, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
                console.log("hi")
                console.log(response.data.data)
                setSociety(response.data.data[0].paginetResult);
                console.log(society)
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
            headerName: "Society Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "contact",
            headerName: "Contact No",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "area",
            headerName: "Area",
            flex: 1,
        },
        {
            field: "city",
            headerName: "City",
            flex: 1,
        },
        {
            field: "state",
            headerName: "State",
            flex: 1,
        },
        {
            field: "pinCode",
            headerName: "Pin Code",
            flex: 1,
        },
    ];

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="SOCIETY LIST" subtitle="Managing the Members" />
                <Link to={`${location.pathname}/addnewsociety`}>
                    <Button sx={{ fontSize: "12px", padding: "12px", backgroundColor: colors.greenAccent[500], color: colors.grey[100], }}>
                        <UserIcon style={{ height: 30, width: 30, padding: 5, marginRight: 7 }} />
                        Add Society
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
                {
                    society ?
                        <DataGrid
                            // getRowId={(row) => row._id}
                            rows={society}
                            columns={columns}
                            sx={{ fontSize: "14px" }} /> : null
                }
            </Box>px
        </Box>
    );
};

export default Society;
