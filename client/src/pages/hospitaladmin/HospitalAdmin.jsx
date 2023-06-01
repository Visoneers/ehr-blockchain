import React from 'react';
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from '../../components/topbar/Topbar';

import { ReactComponent as UpdateIcon } from '../../assets/icons/update.svg';
import { ReactComponent as HospitalIcon } from '../../assets/icons/hospital.svg';
import { ReactComponent as ListIcon } from '../../assets/icons/list.svg';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';


const menuOptions = [{
  "id": 1,
  "title": "Dashboard",
  "to": "/hospitaladmin",
  "icon": <HomeIcon />,
}, {
  "id": 2,
  "title": "Users",
  "to": "/hospitaladmin/users",
  "icon": <ListIcon />
}, {
  "id": 3,
  "title": "Doctors",
  "to": "/hospitaladmin/doctors",
  "icon": <HospitalIcon />
}, {
  "id": 4,
  "title": "Update Records",
  "to": "/hospitaladmin/records",
  "icon": <UpdateIcon />
},
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
