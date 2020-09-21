import React from 'react'
import {connect} from 'react-redux'
import {showManagers} from '../../state/actions/managersAction'
import {showMainDialog} from '../../state/actions/dialogAction'
import { Avatar, Button, Card, CardHeader, Grid, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { green, grey } from '@material-ui/core/colors'
import {updateManager} from '../../state/actions/managersAction'
class ShowManagers extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            formData:{
                district_id:0
            },
            updating:false,
            updating_id:0,
            updateDone:false
        }
    }

    componentDidMount = ()=>{
    
        this.props.showManagers('not_assigned');
    }

    updateManager = (managerId)=>{
        this.setState({
            updating:true,
            updating_id:managerId
        })
        const {formData} = this.state;
        formData['district_id'] = this.props.district_id
        this.props.updateManager(managerId,formData);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status){
            this.setState({
                updateDone:true
            })
            setTimeout(()=>{
                window.location.reload()
                this.props.showMainDialog({'show':false,'page':null,'title':'',actions:{on:false,path:'',id:''}})
            },2000)

        }
    }
    
    render(){
        return (
            <div>
                {
                    this.props.loading
                    ?
                        (
                            <Grid container spacing={2}>
                                <Grid item md={3} sm={12} xs={12}>
                                    <Skeleton variant={'rect'} width={150} height={100} style={{color:grey[500]}}/>
                                </Grid>
                            </Grid>
                        )
                    :
                        (
                            <div>
                                {
                                    this.state.updateDone
                                    ?
                                        (
                                            <Typography style={{color:green[500]}}>Updated successfully</Typography>
                                        )
                                    :
                                        (
                                            <Grid container spacing={2}>
                                                {
                                                this.props.managersNotAssignedDistrict.map(manager=>(
                                                    <Grid item md={6} xs={12} sm={12}>
                                                        <Card>
                                                        <CardHeader
                                                            style={{display:'flex',flexDirection:'row',alignItems:'center'}}
                                                            avatar={<Avatar>{manager.first_name.charAt(0)}</Avatar>}
                                                            subheader={manager.phone}
                                                            title={`${manager.first_name} ${manager.last_name}`}
                                                            action={
                                                                this.state.updating&&manager.id==this.state.updating_id
                                                                ?
                                                                    (
                                                                        <Typography style={{color:green[500]}}>Updating...</Typography>
                                                                    )
                                                                :
                                                                    (
                                                                        <Button
                                                                            onClick={()=>this.updateManager(manager.id)} 
                                                                            style={{marginTop:15,textTransform:'none'}}
                                                                            variant={'outlined'}
                                                                            color={'primary'}
                                                                            size={'small'}>
                                                                                Assign
                                                                        </Button>
                                                                    )
                                                            }
                                                        />
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
            </div>
        )
    }
}

const mapStateToProps = state=>({
    managersNotAssignedDistrict:state.authReducer.adminReducer.managerReducers.managersNotAssignedDistrict,
    loading:state.authReducer.adminReducer.managerReducers.loading,
    response:state.authReducer.adminReducer.managerReducers.response
})
export default connect(mapStateToProps,{showManagers,showMainDialog,updateManager})(ShowManagers)