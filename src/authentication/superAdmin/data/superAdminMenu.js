import DashboardIcon from '@material-ui/icons/Dashboard'
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar'
import SettingIcon from '@material-ui/icons/Settings'
import VideocamIcon from '@material-ui/icons/Videocam'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import MusicNotIcon from '@material-ui/icons/MusicNote'
import PersonIcon from '@material-ui/icons/Person';
import ExtensionIcon from '@material-ui/icons/Extension';
import BusinessIcon from '@material-ui/icons/Business'
import React from "react";
const superAdminMenu = [
    {
        name:'Dashboard',
        route:'/auth',
        icon:<DashboardIcon/>
    },
    {
        name:'Users',
        route:'/auth/admin/users',
        icon:<PersonIcon/>
    },
    {
        name:'Companies',
        route:'/auth/admin/companies',
        icon:<BusinessIcon/>
    },
    {
      name:'Adverts',
      route:'/auth/admin/adverts',
      icon:<VideocamIcon/>
    },

    {
        name:'Settings',
        route:'/auth/admin/settings',
        icon: <SettingIcon/>,
    },
]

export default superAdminMenu
