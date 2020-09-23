import { Avatar, Button, Card, CardContent, CardHeader, Container, Grid, IconButton, Typography } from '@material-ui/core'
import React from 'react'
import PersonIcon from '@material-ui/icons/Person'
import AddIcon from '@material-ui/icons/Add'
import {showMainDialog} from '../admin/state/actions/dialogAction'
import {connect } from 'react-redux'
import AddNewUser from '../commons/AddNewUser'
import {fetchTechnician} from '../admin/state/actions/managersAction'
import Skeleton from '@material-ui/lab/Skeleton'
import { grey, red } from '@material-ui/core/colors'
import AssignGroup from './component/widgets/AssignGroup'
class Technicians extends React.Component{

    addTechnicians = ()=>{
        this.props.showMainDialog({'show':true,'page':<AddNewUser role={'manager'}  />,'title':`Add new technician`,actions:{on:false,path:'',id:''}})
    }

    assignGroup = (technician)=>{
        this.props.showMainDialog({'show':true,'page':<AssignGroup technician={technician} />,'title':`Assign group to ${technician.first_name}`,actions:{on:false,path:'',id:''}})

    }

    componentDidMount(){
        this.props.fetchTechnician()
    }
    render(){
        return (
            <Container maxWidth={'lg'}>
                <Card>
                    <CardHeader
                     style={{backgroundColor:'#3C4252',color:'white'}}
                     title={'Technicians'}
                     avatar={<PersonIcon/>}
                     action={
                         <IconButton onClick={()=>this.addTechnicians()} color={'inherit'}>
                             <AddIcon/>
                         </IconButton>
                     }
                    />
                    <CardContent>
                        {
                            this.props.loading
                            ?
                                (
                                    <Grid container spacing={2}>
                                        <Grid item md={4} xs={12} sm={12}>
                                            <Skeleton
                                             style={{backgroundColor:grey[500]}}
                                             variant={'rect'}
                                             width={'100%'}
                                             height={150}
                                            />
                                        </Grid>
                                        <Grid item md={4} xs={12} sm={12}>
                                            <Skeleton
                                             style={{backgroundColor:grey[500]}}
                                             variant={'rect'}
                                             width={'100%'}
                                             height={150}
                                            />
                                        </Grid>
                                        <Grid item md={4} xs={12} sm={12}>
                                            <Skeleton
                                             style={{backgroundColor:grey[500]}}
                                             variant={'rect'}
                                             width={'100%'}
                                             height={150}
                                            />
                                        </Grid>
                                    </Grid>
                                )
                            :
                                (
                                    <div>
                                        {
                                            this.props.technicians.length<=0
                                            ?
                                                (
                                                    <Typography>
                                                        There is no registered technicians until now ):
                                                    </Typography>
                                                )
                                            :
                                                (
                                                    <Grid container spacing={2}>
                                        {
                                            this.props.technicians.map(
                                                technician=>(
                                                    <Grid item md={4} xs={12} sm={12}>
                                                        <Card>
                                                            <CardHeader
                                                             title={`${technician.first_name} ${technician.last_name}`}
                                                             subheader={technician.phone}
                                                             avatar={<Avatar>{technician.first_name.charAt(0)}</Avatar>}
                                                            />
                                                            <CardContent>
                                                                <Typography style={{display:'flex',flexDirection:'row'}}>Group: 
                                                                {
                                                                    technician.group.length>0
                                                                    ?
                                                                        (
                                                                        <span>{technician.group[0].name}</span>
                                                                        )
                                                                    :
                                                                        (
                                                                            <div style={{display:'flex',flexDirection:'row',marginLeft:10}}>
                                                                                <span style={{color:red[500]}}>Not assigned</span>
                                                                                <Button
                                                                                 onClick={()=>this.assignGroup(technician)}
                                                                                 size={'small'}
                                                                                 variant={'outlined'}
                                                                                 color={'primary'}
                                                                                 style={{textTransform:'none',marginLeft:10}}
                                                                                >
                                                                                    Assign now
                                                                                </Button>
                                                                            </div>
                                                                        )
                                                                }
                                                                </Typography>
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
    technicians:state.authReducer.adminReducer.managerReducers.technicians,
    loading:state.authReducer.adminReducer.managerReducers.techniciansLoading
})

export default connect(mapStateToProps,{showMainDialog,fetchTechnician})(Technicians)