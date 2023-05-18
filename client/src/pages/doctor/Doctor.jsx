import React from 'react';
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from '../../components/topbar/Topbar';

import { ReactComponent as UpdateIcon } from '../../assets/icons/update.svg';
import { ReactComponent as ListIcon } from '../../assets/icons/list.svg';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';


const menuOptions = [{
  "id": 1,
  "title": "Dashboard",
  "to": "/",
  "icon": <HomeIcon />,
}, {
  "id": 2,
  "title": "Users",
  "to": "/doctor/users",
  "icon": <ListIcon />
}, {
  "id": 3,
  "title": "View Records",
  "to": "/doctor/records",
  "icon": <UpdateIcon />
}, {
  "id": 4,
  "title": "Update Records",
  "to": "/doctor/update",
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
