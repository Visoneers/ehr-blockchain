import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../assets/theme";
import AuthContext from "../../context/AuthProvider";

import LogoutIcon from '@mui/icons-material/Logout';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import StorageIcon from "@mui/icons-material/Storage";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import "react-pro-sidebar/dist/css/styles.css";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);



  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100]
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>
        {title}
      </Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ menuOptions }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const userName = localStorage.getItem("user_name");
  const userRole = localStorage.getItem("user_role");
  const returnRole = role => {
    if (role == "644e0d8ae22255e5791984b5") return "Super Admin";
    if (role == "644e0da2e22255e5791984b6") return "Society Admin";
    if (role == "644e0db8e22255e5791984b7") return "Hospital Admin";
    if (role == "644e0dc7e22255e5791984b8") return "User";
    if (role == "644e0ddae22255e5791984b9") return "Doctor";
  };
  const { setAuth } = useContext(AuthContext)

  const location = useLocation();
  
  const handleLogout = () => {
    setAuth('');
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_role');
    navigate("/login")
    // <Navigate to="/login" state={{ from: location }} replace />
  }

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
          padding: "7px"
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important"
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important"
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important"
        }
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100]
            }}
          >
            {!isCollapsed &&
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]} />
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>}
          </MenuItem>

          {!isCollapsed &&
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={require("../../assets/images/auth_background.jpg")}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {userName.charAt(0).toUpperCase() + userName.slice(1)}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {returnRole(userRole)}
                </Typography>
              </Box>
            </Box>}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {menuOptions.map(data => {
              return (
                <Item
                  key={data.id}
                  title={data.title}
                  to={data.to}
                  icon={data.icon}
                  selected={selected}
                  setSelected={setSelected}
                />
              );
            })}
            <Button onClick={handleLogout}>Logout</Button>
            <MenuItem
              style={{
                color: colors.grey[100],
              }}
              icon={<LogoutIcon />}
              onClick={handleLogout}
            >
              <Typography>Logout</Typography>
            </MenuItem>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
