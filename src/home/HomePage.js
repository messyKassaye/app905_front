import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import homeStyles from './styles/homeStyle'
import { AppBar, Card, CardContent, Container, Toolbar } from '@material-ui/core'
import signup from './styles/signup_style'
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {Link} from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import LoadingButton from "../authentication/commons/LoadingButton";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { withRouter } from 'react-router-dom'
import {API_AUTH_URL} from "../constants/constants";
import {set, setRole} from "../TokenService";
import Login from './Login'
import LogoComponent from '../authentication/commons/LogoComponent'
import { orange,green } from '@material-ui/core/colors'
import HomeAppBar from './HomeAppBar'
import AccidentsPage from './AccidentsPage'
import FooterPage from './FooterPage'

class HomePage extends React.Component{

    render(){
        const {classes} = this.props
        return (
            <div className={classes.root}>
                <HomeAppBar/>
                <div className={classes.container}>
                    <AccidentsPage/>
                </div>
                <FooterPage/>
            </div>
        )
    }
}

export default withStyles(homeStyles)(HomePage)