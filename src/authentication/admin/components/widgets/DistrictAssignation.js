import React from 'react'
import {showDistrict} from '../../state/actions/districtsAction'
import {connect} from 'react-redux'
import {showMainDialog} from '../../state/actions/dialogAction'
import { Avatar, Button, Card, CardHeader, Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { green, grey, red } from '@material-ui/core/colors';
import {updateManager} from '../../state/actions/managersAction'
class DistrictAssignation extends React.Component{

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

    updateManager = (districtId)=>{
        this.setState({
            updating:true,
            updating_id:districtId
        })
        const {formData} = this.state;
        formData['district_id'] = districtId
        this.props.updateManager(this.props.user.id,formData);
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
    componentDidMount(){
        this.props.showDistrict('not_assigned');
    }

    assignDistrict = (district)=>{

    }
    render(){
        return (
            <div>
                {
                    this.props.showLoading
                    ?
                        (
                            <Grid container spacing={2}>
                                        <Grid item md={12} xs={12} sm={12}>
                                            <Skeleton
                                                variant={'rect'}
                                                width={'100%'}
                                                height={100}
                                                style={{backgroundColor:grey[500]}}
                                             />
                                        </Grid>
                                        <Grid item md={12} xs={12} sm={12}>
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
                                    this.state.updateDone
                                    ?
                                        (<Typography style={{color:green[500]}}>Update is done</Typography>)
                                    :
                                        (

                                            <Grid container spacing={2}>
                                            {
                                                this.props.showDistricts
                                                .map(district=>(
                                                    <Grid item md={12} xs={12} sm={12}>
                                                         <Card>
                                                            <CardHeader
                                                             title={`${district.name}`}
                                                             subheader={
                                                                 district.region.length>0
                                                                 ?
                                                                    (<span>{`${district.region[0].region_name}, ${district.sub_city_zone[0].sub_city_zone_name}`}</span>)
                                                                 :
                                                                    (
                                                                        <span style={{color:red[500]}}>Area not assigned</span>
                                                                    )
                                                             }
                                                            avatar={<Avatar>{district.name.charAt(0)}</Avatar>}
                                                            action={
                                                                this.state.updating&&this.state.updating_id===district.id
                                                                ?
                                                                    (
                                                                        <Typography style={{color:green[500]}}>Updating</Typography>
                                                                    )
                                                                :
                                                                    (
                                                                        <Button
                                                                        onClick={()=>this.updateManager(district.id)}
                                                                        size={'small'}
                                                                        variant={'outlined'}
                                                                        color={'primary'}
                                                                        style={{textTransform:'none',marginTop:15}}
                
                                                                    >
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
    showDistricts:state.authReducer.adminReducer.districtReducers.showDistricts,
    showLoading:state.authReducer.adminReducer.districtReducers.showLoading,
    response:state.authReducer.adminReducer.managerReducers.response
})

export default connect(mapStateToProps,{showDistrict,updateManager})(DistrictAssignation)