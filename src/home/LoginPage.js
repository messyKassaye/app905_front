import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import homeStyle from './styles/homeStyle'
import HomeAppBar from './HomeAppBar'
import { Card, CardContent } from '@material-ui/core'
import Login from './Login'
import FooterPage from './FooterPage'
class LoginPage extends React.Component{

    render(){
        const {classes} = this.props
        return (
            <div className={classes.root}>
                <HomeAppBar/>
                <div className={classes.container}>
                <Card className={classes.card}>
                  <CardContent>
                    <Login/>
                 </CardContent>
                </Card>
                </div>
                <FooterPage/>
            </div>
        )
    }
}

export default withStyles(homeStyle)(LoginPage)