import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@material-ui/core'
import React from 'react'
import {fetchGroup} from '../../state/action/groupsAction'
import {connect} from 'react-redux'
import Skeleton from '@material-ui/lab/Skeleton'
import { green, grey, red } from '@material-ui/core/colors'
import {assginGroup} from '../../state/action/groupUserAcction'
import {showMainDialog} from '../../../admin/state/actions/dialogAction'
class AssignGroup extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            formData:{
                user_id:'',
                group_id:''
            },
            updating:false,
            updatingId:0,
            updateDone:false
        }
    }
    componentDidMount(){
        this.props.fetchGroup()
        const {formData} = this.state
        formData['user_id'] = this.props.technician.id
        this.setState(formData)
    }

    assignGroupUser = (group)=>{
        this.setState({updating:true,updatingId:group.id,groupName:group.name})
       const {formData} = this.state
       formData['group_id'] = group.id;
       this.setState(formData);
        this.props.assginGroup(formData)
        
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status){
            this.setState({
                updateDone:true
            })
            setTimeout(()=>{
                this.props.showMainDialog({'show':false,'page':null,'title':'',actions:{on:false,path:'',id:''}})
            },2000)

        }
    }

    findUnAssignedGroup = groups=>{
        let unAssignedGroup =[]
        groups.map(group=>{
            if(group.members.length<=0){
                unAssignedGroup.push(group)
            }
        })

        return unAssignedGroup
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
                                    this.state.updateDone
                                    ?
                                        (
                                        <Typography style={{color:green[500]}}>{`${this.props.technician.first_name} is assigned ${this.state.groupName} group successfully `}</Typography>
                                        )
                                    :
                                        (
                                            <Grid container spacing={2}>
                                {
                                    <div>
                                        {
                                            this.findUnAssignedGroup(this.props.groups).length<=0
                                            ?
                                                (
                                                    <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                                                        <Typography style={{color:red[500]}}>
                                                         We can't find any groups that are not un assigned to any one
                                                        </Typography>
                                                        
                                                    </div>
                                                )
                                            :
                                                (
                                                    <div>
                                                        {
                                                            this.findUnAssignedGroup(this.props.groups)
                                                            .map(group=>(
                                                                <Grid item md={6} xs={12} sm={12}>
                                                                    <Card>
                                                                        <CardHeader
                                                                         title={group.name}
                                                                         avatar={<Avatar>{group.name.charAt(0)}</Avatar>}
                                                                         
                                                                        />
                        
                                                                        <CardActions
                                                                        style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                                                                           {
                                                                               this.state.updating&&this.state.updatingId===group.id
                                                                               ?
                                                                                    (
                                                                                        <Typography style={{color:green[500]}}>Updaing</Typography>
                                                                                    )
                                                                               :
                                                                                    (
                                                                                        <Button
                                                                                            onClick={()=>this.assignGroupUser(group)}
                                                                                            size={'small'}
                                                                                            variant={'outlined'}
                                                                                            color={"primary"}
                                                                                            style={{textTransform:'none'}}>
                                                                                            Assign this group
                                                                                        </Button>
                                                                                    )
                                                                           }
                                                                        </CardActions>
                                                                    </Card>
                                                                </Grid>
                                                            ))
                                                        }
                                                    </div>
                                                )
                                        }
                                    </div>
                        
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
    response:state.authReducer.districtManagersReducer.groupUserAssignReducer.response
})
export default connect(mapStateToProps,{showMainDialog,fetchGroup,assginGroup})(AssignGroup)