import React from 'react';
import { Outlet } from "react-router-dom";

import AuthContext from "../../context/AuthProvider";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from '../../components/topbar/Topbar';

import { ReactComponent as UpdateIcon } from '../../assets/icons/update.svg';
import { ReactComponent as HospitalIcon } from '../../assets/icons/hospital.svg';
import { ReactComponent as ListIcon } from '../../assets/icons/list.svg';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';


const menuOptions = [{
  "id": 1,
  "title": "Dashboard",
  "to": "/admin",
  "icon": <HomeIcon />,
}, {
  "id": 2,
  "title": "Users",
  "to": "/admin/users",
  "icon": <ListIcon />
}, {
  "id": 3,
  "title": "Hospitals",
  "to": "/admin/hospitals",
  "icon": <HospitalIcon />
}, {
  "id": 4,
  "title": "Update Records",
  "to": "/admin/update",
  "icon": <UpdateIcon />
},{
  "id": 5,
  "title": "View Records",
  "to": "/admin/records",
  "icon": <UpdateIcon />
}
]

const Admin = () => {
  return (
    <>
      <Sidebar menuOptions={menuOptions} />
      <main className="content">
        <Topbar />
        <Outlet />
      </main>
    </>
  )
}

export default Admin;
