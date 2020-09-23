import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Container, Divider, Grid, Typography } from '@material-ui/core'
import React from 'react'
import Pusher from 'pusher-js'
import {connect} from 'react-redux'
import {me} from '../../state/actions/usersActions'
import axios from 'axios'
import { API_URL } from '../../../constants/constants'
import {fetchFaultTypes} from '../state/action/faultTypeAction'
import Skeleton from '@material-ui/lab/Skeleton'
import { green, grey, red } from '@material-ui/core/colors'
import  WarningIcon from '@material-ui/icons/Warning'
import SendIcon from '@material-ui/icons/Send';
class DistricMangerHome extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            accidents:[],
            highestPriorityAccidents:[],
            loading:true
        }
    }
    componentDidMount(){
    this.props.fetchFaultTypes()
    this.props.me()
    this.findAccidents()

    let PUSHER_APP_KEY = "c294beff32419272612c"
    let pusher = new Pusher(PUSHER_APP_KEY, {
      cluster: 'ap2',
      forceTLS: true
    });

    let channel = pusher.subscribe('accident-on');
    channel.bind('all-accidents',(data)=>{
        this.showData(data)
    });

    }

    showData = (data)=>{
        const {accidents} = this.state
        accidents.push(data)
        this.setState(accidents)
    }

    findAccidents = ()=>{
        axios.get(`${API_URL}accidents/false`)
        .then(response=>response.data)
        .then(res=>{
            this.setState({
                loading:false
            })
            res.map(data=>{
                if(data.fault_type.priority===1){
                    const {highestPriorityAccidents} = this.state
                    highestPriorityAccidents.push(data)
                    this.setState(highestPriorityAccidents)
                }
            })
            this.setState({accidents:res,loading:false})
        })
    }

    showAccidents = data=>{
        if(data.fault_type.priority===1){
            return <Card>
                <CardHeader
                 style={{backgroundColor:red[500],color:'white'}}
                 title={'Highest priority'}
                />
                <CardContent>

                </CardContent>
            </Card>
        }
    }
    render(){
        return <Container maxWidth={'lg'}>
                    {
                        this.state.loading
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
                                <Grid container spacing={2}>

                                    <Grid item md={12} xs={12} sm={12}>
                                        <Card>
                                            <CardHeader
                                              style={{backgroundColor:green[500],color:'white'}}
                                              title={'Accidents send to your district'}
                                              avatar={<SendIcon/>}
                                            />
                                        </Card>
                                    </Grid>

                                        <Grid item md={12} sm={12} xs={12}>
                                            <Card>
                                                <CardHeader
                                                style={{backgroundColor:red[500],color:'white'}}
                                                title={'Highest priority accidents'}
                                                avatar={<WarningIcon/>}
                                                />
                                                <CardContent>
                                                {
                                                    this.state.highestPriorityAccidents.length>0
                                                    ?
                                                        (
                                                            <Grid container spacing={2}>
                                                                {
                                                                    this.state.highestPriorityAccidents.map(accident=>(
                                                                        <Grid item md={4} xs={12} sm={12}>
                                                                            <Card>
                                                                                <CardHeader
                                                                                     title={accident.specific_name}
                                                                                     subheader={accident.fault_type.name}
                                                                                     avatar={<Avatar>{accident.specific_name.charAt(0).toUpperCase()}</Avatar>}
                                                                                     action={
                                                                                         <Button
                                                                                          color={'primary'}
                                                                                          size={'small'}
                                                                                          variant={'contained'}
                                                                                          style={{textTransform:'none'}}
                                                                                         >
                                                                                             Send group
                                                                                        </Button>
                                                                                     }
                                                                                />
                                                                                <Divider/>
                                                                                <CardContent>
                                                                                        <Typography variant={'body1'} gutterBottom>
                                                                                            {`Location: ${accident.region.name}, ${accident.subcity.name},${accident.woreda.name}`}
                                                                                        </Typography>
                                                                                        <Typography>{`Sender phone: ${accident.sender_phone}`}</Typography>
                                                                                </CardContent>
                                                                                <CardActions style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                                                                                            <Button 
                                                                                            variant={'outlined'}
                                                                                            color={'primary'}
                                                                                            style={{textTransform:'none'}}
                                                                                            size={'small'}>
                                                                                                Remove
                                                                                            </Button>
                                                                                    </CardActions>
                                                                            </Card>
                                                                        </Grid>
                                                                    ))
                                                                }
                                                            </Grid>
                                                        )
                                                    :
                                                        (
                                                            <Typography>No highest priority accident until now ):</Typography>
                                                        )
                                                }
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                </Grid>
                            )
                    }
        </Container>
    }
}

const mapStateToProps = state=>({
    user:state.userData.user,
    loading:state.userData.loading,
    faultTypeLoading:state.authReducer.districtManagersReducer.managerFaultTypes.faultTypeLoading,
    faultTypes:state.authReducer.districtManagersReducer.managerFaultTypes.faultTypes
})

export default connect(mapStateToProps,{me,fetchFaultTypes})(DistricMangerHome)