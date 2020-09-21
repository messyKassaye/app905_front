import { Card, CardContent, CardActions, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core'
import React from 'react'
import faultRegistrationStyle from './style/faultRegistrationStyle'
import withStyles from '@material-ui/core/styles/withStyles'
import { green, red } from '@material-ui/core/colors'

import FaultRegisterCard from './widgets/FaultRegisterCard'
class FaultRegistration extends React.Component{

    constructor(props){
        super(props)
        this.state ={
            message:"There is no registered accident type until now. Please start registering your accident types for your districts",

        }
    }
    
    render(){
        const {classes} = this.props
        
        
        return (
            <div className={classes.container}>
                <Card className={classes.card} elevation={0}>
                    <CardContent>
                        <Typography style={{color:green[500],margin:15}}>
                            {this.state.message}
                        </Typography>
                        <FaultRegisterCard/>
                    </CardContent>
                    <CardActions style={{display:'flex',
                                        flexDirection:'row',
                                        justifyContent:'flex-end',
                                        paddingBottom:20,
                                        paddingRight:25}}>
                        <Button 
                        
                            color={'primary'}
                            variant={'text'}>
                            done
                        </Button>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default withStyles(faultRegistrationStyle)(FaultRegistration)