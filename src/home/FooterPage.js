import { Card, Container } from '@material-ui/core'
import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import homeStyle from './styles/homeStyle'
class FooterPage extends React.Component{

    render(){
        const {classes} = this.props
        return(
            <div className={classes.footer}>
                <Container maxWidth={'lg'}>
                     FooterPage
                </Container>
            </div>
        )
    }
}

export default withStyles(homeStyle)(FooterPage)