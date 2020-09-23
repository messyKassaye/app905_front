import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Grid } from '@material-ui/core'
import React from 'react'
import {showGroup} from '../../state/action/groupsAction'
import {connect} from 'react-redux'
import Skeleton from '@material-ui/lab/Skeleton'
import { grey } from '@material-ui/core/colors'
class AssignGroup extends React.Component{

    componentDidMount(){
        this.props.showGroup('not_assigned')
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
                            <Grid container spacing={2}>
                                {
                                    this.props.groups
                                    .map(group=>(
                                        <Grid item md={6} xs={12} sm={12}>
                                            <Card>
                                                <CardHeader
                                                 title={group.name}
                                                 avatar={<Avatar>{group.name.charAt(0)}</Avatar>}
                                                 
                                                />

                                                <CardActions
                                                style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                                                    <Button
                                                     size={'small'}
                                                     variant={'outlined'}
                                                     color={"primary"}
                                                     style={{textTransform:'none'}}>
                                                         Assign this group
                                                     </Button>
                                                </CardActions>
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
}

const mapStateToProps = state=>({
    groups:state.authReducer.districtManagersReducer.groupsReducer.showGroup,
    loading:state.authReducer.districtManagersReducer.groupsReducer.showLoading
})
export default connect(mapStateToProps,{showGroup})(AssignGroup)