import React from 'react';
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

import { tokens } from "../assets/theme";
import Header from '../components/header/Header';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Addprescription = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="PRESCRIPTION" subtitle="Add Prescription" />
                <Button sx={{ fontSize: "14px", padding: "10px", backgroundColor: colors.greenAccent[500], color: colors.grey[100], }}>
                    Add
                </Button>
            </Box>

            <Box m="20px">
                <Grid container spacing={1} direction="row" backgroundColor={colors.primary[400]} >
                    <Grid item xs={12} container padding={1}>
                        <Grid item xs={8}>
                            <Typography variant='h5'><b>Patient ID</b>: PPMSY70V, <b>Prescription ID</b>: AS3L3VV22</Typography>
                        </Grid>
                        <Grid item xs={2} />
                        <Grid item xs={2}>
                            <Typography variant='h5'><b>Date</b>: 02/10/2022</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={1} direction="row" >
                    <Grid item xs={12} container padding={1}>
                        <Grid item xs={2}>
                            <Typography variant='h4'><b>Dr. John Doye</b></Typography>Eye Specialist<br /><b>Nephrology</b><br />MBBS<br />B25, Pune
                        </Grid>
                        <Grid item xs={2} />
                        <Grid item xs={8}>
                            <Typography variant='h4'><b>K.E.M Hospital</b></Typography>House#25, 4th Floor, Mannan Plaza, Khilkhet,
                                Dhaka-1229, Bangladesh.<br />bdtask@gmail.com<br />1922296392
                        </Grid>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={1} direction="row" backgroundColor={colors.primary[400]} >
                    <Grid item xs={12} container padding={1}>
                        <Grid item xs={12}>
                            <Typography variant="h5"><b>Patient Name</b>: Prasun Bhunia, <b>Age</b>: 22 Years, <b>Sex</b>: Male, <b>Insurance Name</b>: Star Health Insurance</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={1} direction="row" >
                    <Grid item xs={12} container padding={1} spacing={1}>
                        <Grid item xs={4} border>
                            <Typography variant="h5"><b>Patient Notes</b>: None</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TableContainer>
                                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Medicine Name</StyledTableCell>
                                            <StyledTableCell align="right">Type</StyledTableCell>
                                            <StyledTableCell align="right">Days</StyledTableCell>
                                            <StyledTableCell align="right">Instruction</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <StyledTableRow>
                                            <TableCell>Napa</TableCell>
                                            <TableCell align="right">Bio</TableCell>
                                            <TableCell align="right">5</TableCell>
                                            <TableCell align="right">None</TableCell>
                                        </StyledTableRow>
                                        <StyledTableRow>
                                            <TableCell>Astimin</TableCell>
                                            <TableCell align="right">Anti</TableCell>
                                            <TableCell align="right">5</TableCell>
                                            <TableCell align="right">None</TableCell>
                                        </StyledTableRow>
                                        <StyledTableRow>
                                            <TableCell>Sabril</TableCell>
                                            <TableCell align="right">Bio</TableCell>
                                            <TableCell align="right">5</TableCell>
                                            <TableCell align="right">None</TableCell>
                                        </StyledTableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={1} direction="row" >
                    <Grid item xs={12} container>
                        <Grid item xs={3} />
                        <Grid item xs={1} />
                        <Grid item xs={8}>
                            <TableContainer>
                                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Diagnosis</StyledTableCell>
                                            <StyledTableCell>Instructions</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Grid>
                <br /><br /><br />
                <Grid container spacing={1} direction="row" >
                    <Grid item xs={12} container>
                        <Grid item xs={3} />
                        <Grid item xs={1} />
                        <Grid item xs={8}>
                            <p id="sname" align="center">--------------------------------------------------------<br />Signature</p>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Addprescription;