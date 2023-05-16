import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Web3 from "web3";
import { ColorModeContext, useMode } from "./assets/theme";

import Admin from "./pages/admin/Admin";
import HospitalAdmin from "./pages/hospitaladmin/HospitalAdmin";
import Doctor from './pages/doctor/Doctor';
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Missing from "./pages/missing/Missing";
import Unauthorized from "./pages/unauthorized/Unauthorized";
import Layout from "./pages/layout/Layout";

import Dashboard from "./components/dashboard/Dashboard";
import MDupdate from "./components/mdupdate/MDupdate";
import MDrecord from "./components/mdrecord/MDrecord";
import ViewRecord from "./components/mdrecord/Viewrecord";
import Doctors from "./components/doctors/Doctors";
import RequireAuth from "./helpers/RequireAuth";
import Addprescription from "./pages/AddPrescription";
import NewUser from "./components/users/NewUser";
import Users from "./components/users/Users";
import Hospitals from "./components/hospitals/Hospitals";
import NewHospitals from "./components/hospitals/NewHosptals";
import NewDoctor from "./components/doctors/NewDoctor";

const ROLES = {
  Admin: 2001,
  HospitalAdmin: 1984,
  Doctor: 5467,
  User: 1240,
};

function App() {
  const [theme, colorMode] = useMode();
  const [account, setAccount] = useState("0x..");

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          setAccount([result[0]]);
        });
    } else {
      window.alert("Install MetaMask please!!");
    }
  };
  useEffect(() => {
    loadWeb3();
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Layout />}>

            {/* Admin Routes */}
            <Route path="/admin" element={<Admin />}>
              <Route index element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="users/addnewuser" element={<NewUser />} />
              <Route path="hospitals" element={<Hospitals />} />
              <Route path="hospitals/addnewhospital" element={<NewHospitals />} />
              <Route path="update" element={<MDrecord action="update" />} />
              <Route path="update/:userID" element={<MDupdate account={account} />} />
              <Route path="records" element={<MDrecord action="records" />} />
              <Route path="records/:userID" element={<ViewRecord />} />
            </Route>

            {/* Hospital Admin */}
            <Route path="/hospitaladmin" element={<HospitalAdmin />}>
              <Route index element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="users/addnewuser" element={<NewUser />} />
              <Route path="doctors" element={<Doctors />} />
              <Route path="doctors/addnewdoctor" element={<NewDoctor />} />
              <Route path="update" element={<MDrecord action="update"/>} />
              <Route path="update/:userID" element={<MDupdate account={account} />} />
            </Route>


            {/* Doctor Routes */}
            <Route path="/doctor" element={<Doctor />}>
              <Route index element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="users/addnewuser" element={<NewUser />} />
              <Route path="update" element={<MDrecord />} />
              <Route path="update/:userID" element={<MDupdate account={account} />} />
              <Route path="records" element={<MDrecord />} />
              <Route path="records/:userID" element={<ViewRecord />} />
              <Route path="addprescription" element={<Addprescription />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="admin" element={<Admin />} />
            </Route>

            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;