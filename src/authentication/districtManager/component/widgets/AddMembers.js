import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@material-ui/core'
import { green, grey, red } from '@material-ui/core/colors'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'
import {connect} from 'react-redux'
import {fetchTechnician} from '../../../admin/state/actions/managersAction'
import {assginGroup} from '../../state/action/groupUserAcction'

class AddMembers extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            formData:{
                user_id:'',
                group_id:''
            },
            addedDone:false,
            addingId:''
        }
    }

    componentDidMount(){
        this.props.fetchTechnician()
        const {formData} = this.state
        formData['group_id']= this.props.group.id;
        this.setState(formData)
    }

    findUnAssignedMembers = members=>{
        let unAssignedMembers = []
        members.map(member=>{
            if(member.group.length<=0){
                unAssignedMembers.push(member)
            }
        })

        return unAssignedMembers
    }

    addMember = userId=>{
        this.setState({addingId:userId})
        const {formData} = this.state
        formData['user_id']=userId
        this.setState(formData)
        this.props.assginGroup(formData)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status){
            this.setState({
                addedDone:true
            })
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
                                    this.findUnAssignedMembers(this.props.technicians).length<=0
                                    ?
                                        (
                                            <div style={{padding:20,display:'flex',flexDirection:'column',justifyContent:'center'}}>
                                                        <Typography style={{color:red[500]}}>
                                                         We can't find any users that are not un assigned to any group
                                                        </Typography>
                                                        <Typography>
                                                            Register new user now and start adding to any groups
                                                        </Typography>
                                                    </div>
                                        )
                                    :
                                        (
                                            <Card elevation={0}>
                                                <CardContent>
                                                <Grid container spacing={2}>
                                                {
                                                    this.findUnAssignedMembers(this.props.technicians).map(technician=>(
                                                        <Grid item md={6} xs={12} sm={12}>
                                                            <Card>
                                                                <CardHeader
                                                                 title={`${technician.first_name} ${technician.last_name}`}
                                                                 subheader={technician.phone}
                                                                 avatar={<Avatar>{technician.first_name.charAt(0)}</Avatar>}
                                                                 action={
                                                                 <div>
                                                                     {
                                                                         this.state.addedDone&&this.state.addingId===technician.id
                                                                         ?
                                                                            (<Typography style={{color:green[500]}}>Added</Typography>)
                                                                         :
                                                                            (
                                                                                <Button
                                                                                    onClick={()=>this.addMember(technician.id)}
                                                                                    size={'small'}
                                                                                    variant={'outlined'}
                                                                                    style={{textTransform:'none'}}
                                                                                    color={"primary"}>
                                                                                    Add
                                                                                </Button>
                                                                            )
                                                                     }
                                                                 </div>
                                                                 }
                                                                />
                                                            </Card>
                                                        </Grid>
                                                    ))
                                                }
                                            </Grid>
                                            </CardContent>
                                            <CardActions>
                                                <Button
                                                 variant={'contained'}
                                                 size={'small'}
                                                 color={'primary'}
                                                 style={{textTransform:'none'}}
                                                >
                                                    Done
                                                </Button>
                                            </CardActions>
                                            </Card>
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
    response:state.authReducer.districtManagersReducer.groupUserAssignReducer.response,
    technicians:state.authReducer.adminReducer.managerReducers.technicians,
    loading:state.authReducer.adminReducer.managerReducers.techniciansLoading
})

export default connect(mapStateToProps,{fetchTechnician,assginGroup})(AddMembers)