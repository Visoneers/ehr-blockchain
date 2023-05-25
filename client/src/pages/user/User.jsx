import React, { useContext } from 'react';
import { Outlet } from "react-router-dom";

import AuthContext from "../../context/AuthProvider";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from '../../components/topbar/Topbar';

import { ReactComponent as ListIcon } from '../../assets/icons/list.svg';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';


const User = () => {
    const { auth } = useContext(AuthContext);
    const userId=localStorage.getItem("user_id")
    console.log(userId,"userId from user page")
    const menuOptions = [{
        "id": 1,
        "title": "Dashboard",
        "to": "/",
        "icon": <HomeIcon />,
    }, {
        "id": 2,
        "title": "View Records",
        // "to": `/user/records/${auth?.id}`,
        "to": `/user/records/${userId}`,
        "icon": <ListIcon />
    }, {
        "id": 3,
        "title": "View Prescriptions",
        "to": `/user/prescriptions/${userId}`,
        "icon": <ListIcon />
    },
    ]

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

export default User;