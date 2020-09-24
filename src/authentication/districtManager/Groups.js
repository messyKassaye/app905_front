import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Container, Grid, IconButton, Switch, Typography } from '@material-ui/core'
import React from 'react'
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add'
import {showMainDialog} from '../admin/state/actions/dialogAction'
import {connect} from 'react-redux'
import GroupCreator from './component/GroupCreator';
import {me} from '../state/actions/usersActions'
import {fetchGroup,updateGroup} from './state/action/groupsAction'
import { Skeleton } from '@material-ui/lab';
import { green, grey } from '@material-ui/core/colors';
import AddMembers from './component/widgets/AddMembers';
import GroupMembers from './component/widgets/GroupMembers';
class Groups extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            formData:{
                status:''
            },
            changing:false,
            changingId:''
        }
    }

    createGroup = ()=>{
        this.props.showMainDialog({'show':true,'page':<GroupCreator districtId={this.props.user.relations.district[0].id}/>,'title':'Create your group',actions:{on:false,path:'',id:''}})

    }

    addMembers = group=>{
        this.props.showMainDialog({'show':true,'page':<AddMembers group={group} />,'title':`Add members to ${group.name}`,actions:{on:false,path:'',id:''}})
    }

    showMembers = group=>{
        this.props.showMainDialog({'show':true,'page':<GroupMembers group={group} />,'title':`Members of ${group.name} group`,actions:{on:false,path:'',id:''}})
    }
    componentDidMount(){
        this.props.me()
        this.props.fetchGroup()
    }

    handleChange = group=>{
        this.setState({
            changing:true,
            changingId:group.id
        })
        const {formData} = this.state
        formData['status'] = !group.status
        this.setState(formData)
        this.props.updateGroup(this.state.formData,group.id)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status){
                
            setTimeout(()=>{
                window.location.reload()
            },2000)

        }
    }
    render(){
        return(
            <Container maxWidth={'lg'}>
                <Card>
                    <CardHeader
                    style={{backgroundColor:'#3C4252',color:'white'}}
                    avatar={<PersonIcon/>}
                     title={'Groups'}
                     action={<IconButton onClick={this.createGroup} color={'inherit'}><AddIcon/></IconButton>}
                    />
                    <CardContent>
                        {
                            this.props.grousLoading
                            ?
                                (
                                    <Grid container spacing={2}>
                                        <Grid item md={4} cs={12} sm={12}>
                                            <Skeleton
                                             style={{backgroundColor:grey[500]}}
                                             variant={'rect'}
                                             width={'100%'}
                                             height={150}
                                            />
                                        </Grid>

                                        <Grid item md={4} cs={12} sm={12}>
                                            <Skeleton
                                             style={{backgroundColor:grey[500]}}
                                             variant={'rect'}
                                             width={'100%'}
                                             height={150}
                                            />
                                        </Grid>

                                        <Grid item md={4} cs={12} sm={12}>
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
                                    <Grid container spacing={2}>
                                        {
                                            this.props.groups
                                            .map(group=>(
                                                <Grid item md={4} xs={12} sm={12}>
                                                    <Card>
                                                        <CardHeader
                                                         title={group.name}
                                                         subheader={
                                                             group.members.length>0
                                                             ?
                                                                (
                                                                <span>{`${group.members.length} members`}</span>
                                                                )
                                                             :
                                                                (
                                                                    <span>No group members</span>
                                                                )
                                                         }
                                                         avatar={<Avatar>{group.name.charAt(0)}</Avatar>}
                                                         action={
                                                            this.state.changing&&this.state.changingId===group.id
                                                            ?
                                                                (
                                                                    <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                                                     <Typography style={{color:green[500]}}>Updaing...</Typography>
                                                                    </div>
                                                                )
                                                            :
                                                                (
                                                                    <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                                                        <span style={{marginRight:10}}>On work</span>
                                                                        <Switch
                                                                        checked={group.status}
                                                                        onChange={()=>this.handleChange(group)}
                                                                        color={'primary'}
                                                                        />
                                                                    </div>
                                                                )
                                                         }
                                                        />
                                                        <CardActions style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                                                        <Button
                                                                  style={{textTransform:'none'}}
                                                                  disabled={group.members.length<=0?true:false}
                                                                  size={'small'}
                                                                  variant={'text'}
                                                                  color={'secondary'}
                                                                  onClick={()=>this.showMembers(group)}
                                                                 >
                                                                     Show members
                                                                 </Button>

                                                                 <Button
                                                                  onClick={()=>this.addMembers(group)}
                                                                  style={{textTransform:'none'}}
                                                                  size={'small'}
                                                                  variant={'outlined'}
                                                                  color={'primary'}
                                                                 >
                                                                     add member
                                                                 </Button>
                                                        </CardActions>
                                                    </Card>
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                )
                        }
                    </CardContent>
                </Card>
            </Container>
        )
    }
}
const mapStateToProps = state=>({
    user:state.userData.user,
    loading:state.userData.loading,
    groups:state.authReducer.districtManagersReducer.groupsReducer.groups,
    grousLoading:state.authReducer.districtManagersReducer.groupsReducer.loading,
    response:state.authReducer.districtManagersReducer.groupsReducer.updateResponse
})
export default connect(mapStateToProps,{me,fetchGroup,showMainDialog,updateGroup})(Groups)