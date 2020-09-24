import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'
import { orange } from '@material-ui/core/colors'
import React from 'react'
import {Link} from "react-router-dom";
import LogoComponent from '../authentication/commons/LogoComponent'
import withStyles from '@material-ui/core/styles/withStyles'
import homeStyles from './styles/homeStyle'
import LanguageSetter from './LanguageSetter';

class HomeAppBar extends React.Component{

    render(){
        const {classes} = this.props
        return (
            <AppBar>
                    <Toolbar>
                    <Typography component={Link} to={'/'} style={{cursor:'pointer',textDecoration:'none'}}>
                        <LogoComponent variant={'h5'} margin={15} firstColor={'white'} secondColor={orange[500]}/>
                    </Typography>
                    <div className={classes.grow}></div>
                     <LanguageSetter/>
                      <Button
                       component={Link}
                       to={'/login'}
                       variant={'text'}
                       color={'inherit'}
                       className={classes.button}
                      >
                          Login
                      </Button>
                    </Toolbar>
                </AppBar>
        )
    }
}

export default withStyles(homeStyles)(HomeAppBar)