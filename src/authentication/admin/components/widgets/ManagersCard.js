import React from 'react'
import {Container,Card,CardHeader,CardContent,IconButton, Divider, Grid, Avatar, Typography, Button} from '@material-ui/core'
import GroupIcon from '@material-ui/icons/Group';
import AddIcon from '@material-ui/icons/Add'
import {showMainDialog} from '../../state/actions/dialogAction'
import {connect} from 'react-redux'
import {fetchManagers} from '../../state/actions/managersAction'
import AddNewUser from '../../../commons/AddNewUser';
import { Skeleton } from '@material-ui/lab';
import { grey, red } from '@material-ui/core/colors';
import DistrictAssignation from './DistrictAssignation';
class ManagersCard extends React.Component{
    addNewUser = ()=>{
        this.props.showMainDialog({'show':true,'page':<AddNewUser form={{type:'',data:null}}/>,title:'Add new bank',actions:{on:false,path:'',id:''}})

    }

    componentDidMount(){
        this.props.fetchManagers()
    }

    assginDistrict = (manager)=>{
        this.props.showMainDialog({'show':true,'page':<DistrictAssignation user={manager} form={{type:'',data:null}}/>,title:`Assign district for ${manager.first_name}`,actions:{on:false,path:'',id:''}})
    }
    render(){
        return (
            <Container>
                <Card>
                    <CardHeader
                        title={'District managers'}
                        avatar={<GroupIcon/>}
                        action={<IconButton onClick={this.addNewUser} color={'inherit'}><AddIcon/></IconButton>}
                    />
                    <Divider/>
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
                                            this.props.managers.length<=0
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
                                           this.props.managers
                                           .map(manager=>(
                                               <Grid item md={4} xs={12} sm={12}>
                                                   <Card>
                                                       <CardHeader
                                                        title={`${manager.first_name} ${manager.last_name}`}
                                                        subheader={manager.email}
                                                        avatar={<Avatar>{manager.first_name.charAt(0)}</Avatar>}
                                                       />
                                                       <Divider/>
                                                       <CardContent>
                                                                {
                                                                    manager.district.length>0
                                                                    ?
                                                                        (
                                                                            <Typography>{`Manages district: ${manager.district[0].name}`}</Typography>
                                                                        )
                                                                    :
                                                                        (
                                                                            <div style={{display:'flex',flexDirection:'row',padding:5}}>
                                                                                <Typography>Manages district:</Typography>
                                                                                <Typography style={{color:red[500]}}>
                                                                                    Not assigned
                                                                                </Typography>
                                                                                <Button
                                                                                 variant={'outlined'}
                                                                                 size={'small'}
                                                                                 color={'primary'}
                                                                                 style={{textTransform:'none',marginLeft:10}}
                                                                                 onClick={()=>this.assginDistrict(manager)}
                                                                                >
                                                                                    Assign now
                                                                                </Button>
                                                                            </div>
                                                                        )
                                                                }
                                                       </CardContent>
                                                   </Card>
                                               </Grid>
                                           ))
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
    managers:state.authReducer.adminReducer.managerReducers.managers,
    loading:state.authReducer.adminReducer.managerReducers.managerLoading
})
export default connect(mapStateToProps,{showMainDialog,fetchManagers})(ManagersCard)