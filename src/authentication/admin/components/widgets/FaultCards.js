import React from 'react'
import {Container,Card,CardHeader,CardContent,IconButton, Grid, Avatar, Divider, Typography, Button} from '@material-ui/core'
import WarningIcon from '@material-ui/icons/Warning'
import AddIcon from '@material-ui/icons/Add'
import FaultRegistration from '../FaultRegistration'
import {connect} from 'react-redux'
import {showMainDialog} from '../../state/actions/dialogAction'
import {fetchFaultTypes} from '../../state/actions/FaultTypeAction'
import { Skeleton } from '@material-ui/lab'
import { grey } from '@material-ui/core/colors'
import {findFaultColor} from '../../../services/appService'
import FaultRegisterCard from './FaultRegisterCard'
class FaultCards extends React.Component{

    addNewAccident = ()=>{
        this.props.showMainDialog({'show':true,'page':<FaultRegisterCard 
        form={{type:'',data:null}}/>,title:'Add new accident types',actions:{on:false,path:'',id:''}})
    }
    render(){
        return(
            <Container maxWidth={'lg'} style={{marginBottom:25}}>
                <Card>
                    <CardHeader
                        style={{backgroundColor:'#3C4252',color:'white'}}
                        title={'Accident types'}
                        avatar={<WarningIcon/>}
                        action={<IconButton onClick={this.addNewAccident} color={'inherit'}><AddIcon/></IconButton>}
                    />
                    <CardContent>
                        
                        {
                            this.props.loading
                            ?
                                (
                                    <Grid container spacing={2}>
                                        <Grid item md={4} xs={12} sm={12}>
                                            <Skeleton
                                                variant={'rect'}
                                                width={'100%'}
                                                height={100}
                                                style={{backgroundColor:grey[500]}}
                                             />
                                        </Grid>
                                    </Grid>
                                )
                            :
                                (

                                    <div>
                            {
                                this.props.faultTypes.length<=0
                                ?
                                    (
                                        <div style={{display:'flex',width:500,flexDirection:'column',justifyContent:'flex-start'}}>
                                                        <Typography>There is no registered accidents until now!</Typography>
                                                        <Button
                                                            variant={'outlined'}
                                                            color={'primary'}
                                                            style={{textTransform:'none',width:200,marginTop:15}}
                                                            onClick={()=>this.addNewAccident()}
                                                        >
                                                            Register now
                                                        </Button>
                                                    </div>
                                    )
                                :
                                    (
                                        <Grid container spacing={2}>
                                        {
                                            this.props.faultTypes.map(
                                                faults=>(
                                                    <Grid item md={4} xs={12} sm={12}>
                                                        <Card
                                                         style={{backgroundColor:findFaultColor(faults.id),color:'white'}}
                                                        > 
                                                            <CardHeader
                                                             title={faults.name}
                                                             subheader={`Priority no: ${faults.priority}`}
                                                             avatar={<Avatar>{faults.name.charAt(0)}</Avatar>}
                                                            />
                                                            <Divider/>
                                                            <CardContent>
                                                                <Typography>{`Accidents: ${faults.accidents}`}</Typography>
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                )
                                            )
                                        }
                                    </Grid>
                                    )
                            }
                        </div>
                                    
                                )
                        }
                    </CardContent>
                </Card>
            </Container>
        )
    }
}

const mapStateToProps = state=>({
    faultTypes:state.authReducer.adminReducer.faultTypeReducers.faultTypes,
    loading:state.authReducer.adminReducer.faultTypeReducers.loading
})
export default connect(mapStateToProps,{showMainDialog})(FaultCards)