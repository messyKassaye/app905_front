import DashboardIcon from '@material-ui/icons/Dashboard'
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar'
import SettingIcon from '@material-ui/icons/Settings'
import VideocamIcon from '@material-ui/icons/Videocam'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import MusicNotIcon from '@material-ui/icons/MusicNote'
import PeopleIcon from '@material-ui/icons/People';
import ExtensionIcon from '@material-ui/icons/Extension';
import BusinessIcon from '@material-ui/icons/Business'
import PlaceIcon from '@material-ui/icons/Place';
import WarningIcon from '@material-ui/icons/Warning';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import React from "react";
const districtManagerMenu = [
    {
        name:'Dashboard',
        route:'/auth',
        icon:<DashboardIcon/>
    },
    {
        name:'Accidents',
        route:'/auth/districtManager/accidents',
        icon:<WarningIcon/>
    },

    {
        name:'Technicians',
        route:'/auth/districtManager/technicians',
        icon:<PeopleIcon/>
    },
    {
        name:'Groups',
        route:'/auth/districtManager/groups',
        icon:<GroupWorkIcon/>
    },

    {
        name:'Settings',
        route:'/auth/admin/settings',
        icon: <SettingIcon/>,
    },
]

export default districtManagerMenu
