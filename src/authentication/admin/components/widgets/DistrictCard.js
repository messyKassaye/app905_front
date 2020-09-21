import React from 'react'
import {Container,Card,CardHeader,CardContent,IconButton, Grid, Avatar, Typography, Divider, Button} from '@material-ui/core'
import PlaceIcon from '@material-ui/icons/Place'
import AddIcon from '@material-ui/icons/Add'
import {connect} from 'react-redux'
import {showMainDialog} from '../../state/actions/dialogAction'
import AddNewDistrict from './AddNewDistrict'
import { Skeleton } from '@material-ui/lab'
import { green, grey, red } from '@material-ui/core/colors'
import {indexDistrict} from '../../state/actions/districtsAction'
import ShowManagers from './ShowManagers'
import RegionWoredZoneCity from './RegionWoredZoneCity'
import ShowLocations from './ShowLocations'
class DistrictCard extends React.Component{

    addNewDistrict = ()=>{
        this.props.showMainDialog({'show':true,'page':<AddNewDistrict form={{type:'',data:null}}/>,title:'Add new district',actions:{on:false,path:'',id:''}})

    }

    assingManager = (id,name)=>{
        this.props.showMainDialog({'show':true,'page':<ShowManagers district_id={id} form={{type:'',data:null}}/>,title:`Assign manager to ${name} district`,actions:{on:false,path:'',id:''}})

    }

    showLocation = (district)=>{
        this.props.showMainDialog({'show':true,maxWidth:'md','page':<ShowLocations district={district} form={{type:'',data:null}}/>,title:`Controlling areas of ${district.name} district`,actions:{on:false,path:'',id:''}})

    }

    componentDidMount = ()=>{
        this.props.indexDistrict()
    }

    addArea = (district)=>{
        this.props.showMainDialog({'show':true,'page':<RegionWoredZoneCity districtId={district.id} form={{type:'',data:null}}/>,title:`Add controlling areas for ${district.name} district`,actions:{on:false,path:'',id:''}})

    }
    render(){

        return (
            <Container maxWidth={'lg'} style={{marginBottom:20}}>
                <Card>
                    <CardHeader
                        style={{backgroundColor:'#3C4252',color:'white'}}
                        title={'Districts'}
                        avatar={<PlaceIcon/>}
                        action={<IconButton onClick={this.addNewDistrict} color={'inherit'}><AddIcon/></IconButton>}
                    />
                    <CardContent>
                        {
                            this.props.loading
                            ?
                                (
                                    <Grid container spacing={2}>
                                        <Grid item md={3} xs={12} sm={12}>
                                            <Skeleton 
                                            variant={'rect'} 
                                            width={200} height={100} 
                                            style={{backgroundColor:grey[500]}}/>
                                        </Grid>
                                    </Grid>
                                )
                            :
                                (
                                    <div>
                                        {
                                            this.props.districts.length<=0
                                            ?
                                                (
                                                    <div style={{display:'flex',width:500,flexDirection:'column',justifyContent:'flex-start'}}>
                                                        <Typography>There is no registered districts until now!</Typography>
                                                        <Button
                                                            variant={'outlined'}
                                                            color={'primary'}
                                                            style={{textTransform:'none',width:200,marginTop:15}}
                                                            onClick={()=>this.addNewDistrict()}
                                                        >
                                                            Register now
                                                        </Button>
                                                    </div>
                                                )
                                            :
                                                (
                                                    <Grid container spacing={2}>
                                                    {
                                                        this.props.districts
                                                        .map(district=>(
                                                            <Grid item md={4} sm={12} xs={12}>
                                                                <Card>
                                                                <CardHeader
                                                                    title={district.name}
                                                                    avatar={<Avatar>{district.name.charAt(0)}</Avatar>}
                                                                    subheader={
                                                                        <div>
                                                                            {
                                                                                district.manager.length<=0
                                                                                ?
                                                                                    (
                                                                                        <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                                                                          <Typography color={'textSecondary'}>
                                                                                              Managed by:<span style={{color:red[500]}}>not assigned</span>
                                                                                            </Typography>
                                                                                            <IconButton 
                                                                                                onClick={()=>this.assingManager(district.id,district.name)}
                                                                                                size={'small'} 
                                                                                                style={{marginLeft:10}}>
                                                                                                <AddIcon/>
                                                                                            </IconButton>
                                                                                        </div>
                                                                                    )
                                                                                :
                                                                                    (
                                                                                    <Typography>{`Managed by: ${district.manager[0].first_name} ${district.manager[0].last_name}`}</Typography>
                                                                                    )
                                                                            }
                                                                        </div>
                                                                    }
                                                                />
                                                                <Divider/>
                                                                <CardContent>
                                                                <div style={{display:'flex',flexDirection:'row',alignItems:'flex-start'}}>
                                                                    <Typography>Controlling areas:</Typography>
                                                                    {
                                                                        district.region.length<=0
                                                                        ?
                                                                            (
                                                                                <div style={{display:'flex',flexDirection:'row',alignItems:'center',marginTop:-2}}>
                                                                                    <Typography>
                                                                                        <span style={{color:red[500],marginLeft:10}}>Not assigned</span>
                                                                                        <IconButton onClick={()=>this.addArea(district)} size={'small'} style={{marginLeft:10,marginTop:-2}}>
                                                                                            <AddIcon/>
                                                                                        </IconButton>
                                                                                    </Typography>
                                                                                </div>
                                                                            )
                                                                        :
                                                                            (
                                                                                <div style={{display:'flex',flexDirection:'row'}}>
                                                                                   {
                                                                                       district.region.map(region=>(
                                                                                        <Typography>{region.region_name}</Typography>
                                                                                       ))
                                                                                   }
                                                                                   <Button 
                                                                                         onClick={()=>this.showLocation(district)}
                                                                                         style={{textTransform:'none',marginLeft:10}}
                                                                                         size={'small'}
                                                                                         color={'primary'}
                                                                                         variant={'outlined'}
                                                                                         >
                                                                                         Show areas
                                                                                  </Button>
                                                                               </div>
                                                                            )
                                                                    }
                                                                </div>
                                                                <Typography color={'textPrimary'}>{`No of accidents: ${district.accidents}`}</Typography>
                                                                <Typography>{`No of groups: ${district.groups.length}`}</Typography>
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
    districts:state.authReducer.adminReducer.districtReducers.districts,
    loading:state.authReducer.adminReducer.districtReducers.loading
})
export default connect(mapStateToProps,{showMainDialog,indexDistrict})(DistrictCard)