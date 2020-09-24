import React from 'react'
import {fetchGroup} from '../state/action/groupsAction'
import {connect} from 'react-redux'
import { Avatar, Button, Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import { green, grey } from '@material-ui/core/colors'
import {assignFaultToGroup} from '../state/action/faultGroupAction'
import {showMainDialog} from '../../admin/state/actions/dialogAction'
class SendGroup extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            formData:{
                fault_id:'',
                group_id:''
            },
            loading:true,
            sending:false,
            sendingId:''
        }
    }

    componentDidMount(){
        this.props.fetchGroup()
        const {formData} = this.state
        formData['fault_id'] = this.props.accident.id
        this.setState(formData)
    }

    sendGroup = group=>{
        this.setState({sending:true,sendingId:group.id})
        const {formData} = this.state
        formData['group_id'] = group.id
        this.setState(formData);
        this.props.assignFaultToGroup(formData)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status){
            setTimeout(()=>{
                window.location.reload()
                this.props.showMainDialog({'show':false,'page':null,'title':'',actions:{on:false,path:'',id:''}})
            },2000)

        }
    }

    findUnAssignedGroup = groups=>{
        return groups.filter(group=>{
            return group.status===0
        })
    }
    render(){

        return (
            <div>
                {
                    this.props.groups.loading&&this.state.loading
                    ?
                        (
                            <Grid container spacing={2}>
                                <Grid item md={4} xs={12} sm={12}>
                                    <Skeleton
                                     style={{backgroundColor:grey[500]}}
                                     variant={'rect'}
                                     height={150}
                                    />
                                </Grid>
                                <Grid item md={4} xs={12} sm={12}>
                                    <Skeleton
                                     style={{backgroundColor:grey[500]}}
                                     variant={'rect'}
                                     height={150}
                                    />
                                </Grid>
                                <Grid item md={4} xs={12} sm={12}>
                                    <Skeleton
                                     style={{backgroundColor:grey[500]}}
                                     variant={'rect'}
                                     height={150}
                                    />
                                </Grid>
                            </Grid>
                        )
                    :
                        (

                            <div>
                                {
                                    this.findUnAssignedGroup(this.props.groups).length<=0
                                    ?
                                        (
                                            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:15}}>
                                                <Typography style={{color:green[500]}}>All groups are assigned an accident</Typography>
                                                <Typography>
                                                    Maybe if they didn't updated their status. go to groups menu and disable on work button
                                                </Typography>
                                            </div>
                                        )
                                    :
                                        (
                                            <Grid container spacing={2}>
                                {
                                    this.findUnAssignedGroup(this.props.groups).map(group=>(
                                        <Grid key={group.id} item md={6} xs={12} sm={12}>
                                            <Card>
                                            <CardHeader
                                             title={group.name}
                                             subheader={`${group.members.length} members`}
                                             avatar={<Avatar>{group.name.charAt(0)}</Avatar>}
                                             action={
                                                 <Button
                                                 onClick={()=>this.sendGroup(group)}
                                                 variant={'outlined'}
                                                 style={{textTransform:'none'}}
                                                 size={'small'}
                                                 color={'primary'}>
                                                     {
                                                         this.state.sending&&this.state.sendingId===group.id
                                                         ?  
                                                            (<span>Sending...</span>)
                                                         :
                                                            (<span>Send</span>)
                                                     }
                                                 </Button>
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
    groups:state.authReducer.districtManagersReducer.groupsReducer.groups,
    loading:state.authReducer.districtManagersReducer.groupsReducer.loading,
    response:state.authReducer.districtManagersReducer.faultGroupReducer.response
})

export default connect(mapStateToProps,{showMainDialog,fetchGroup,assignFaultToGroup})(SendGroup)