 import React from "react";
import IconButton from "@material-ui/core/IconButton";
import NotificationIcon from '@material-ui/icons/Notifications'
 import withStyles from "@material-ui/core/styles/withStyles";
 import Badge from "@material-ui/core/Badge/Badge";
 import {connect} from "react-redux";
 import Skeleton from "@material-ui/lab/Skeleton";
 import {Link} from "react-router-dom";
class Notifications extends React.Component{

    constructor(props) {
        super(props);

    }

    filterNewNotifications = (notifications)=>{
        return notifications.filter(notification=>{
            return notification.status===0;
        })
    }

    render() {
        const StyledBadge1 = withStyles(theme => ({
            badge: {
                right: -3,
                border: `2px solid ${theme.palette.background.paper}`,
                padding: '0 4px',
            },
        }))(Badge);
        return (
            <div>
                <IconButton
                     color='inherit'
                            >
                              <NotificationIcon/>
                            </IconButton>

            </div>
        );
    }

}


export default Notifications
