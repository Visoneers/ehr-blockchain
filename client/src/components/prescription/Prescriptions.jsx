import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";

import { ImageConfig } from "../../assets/images/imageConfig";
import Header from "../header/Header";
import { tokens } from "../../assets/theme";
import axios from "../../api/axios";

const Prescription = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userID } = useParams();
  const [prescription, setPrescription] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchPrescription = async () => {
      try {
        console.log(userID);
        const response = await axios.get(
          `http://localhost:3000/prescription/${userID}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
          }
        );
        console.log("set prescription");
        console.log(response.data);
        setPrescription(response.data);
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
  console.log(prescription);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  };
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="PRESCRIPTIONS" subtitle="Prescription List" />
      </Box>

      {prescription
        ? prescription.map(prescription =>
            <Box
              key={prescription._id}
              alignItems="Center"
              className="mdrecord"
            >
              <Box
                className="account"
                backgroundColor={colors.primary[400]}
                m="25px"
              >
                <div className="account-item">
                  <div className="acount-item-info">
                    <img src={ImageConfig["default"]} alt="" />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        margin: "10px"
                      }}
                    >
                      <Typography variant="h3" color={colors.grey[100]}>
                        {prescription.doctor[0].fullName}
                      </Typography>
                      <Typography variant="h5" color={colors.greenAccent[300]}>
                        {formatDate(prescription.createdAt)}
                      </Typography>
                     
                    </Box>
                  </div>
                  <div className="account-item-action">
                    <Button
                      sx={{
                        fontSize: "14px",
                        padding: "10px",
                        backgroundColor: colors.blueAccent[500],
                        color: colors.grey[100]
                      }}
                    >
                      <Link to={`${prescription._id}`}>View</Link>
                    </Button>
                  </div>
                </div>
              </Box>
            </Box>
          )
        : null}
    </Box>
  );
};

export default Prescription;
