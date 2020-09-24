import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Chip, Container, Divider, Grid, Typography } from '@material-ui/core'
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
import {showMainDialog} from '../../admin/state/actions/dialogAction'
import SendGroup from './SendGroup'

class DistricMangerHome extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            accidents:[],
            highestPriorityAccidents:[],
            loading:true,
            sending:true,
            sendingId:''
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
        let snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
            snd.play();
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
            this.setState({accidents:res,loading:false})
        })
    }

   findPrioirtyAccidents = (accidents,priority)=>{
      return accidents.filter(accident=>{
           return accident.fault_type.priority===priority
       })
   }

    sendGroup = accident=>{
        this.props.showMainDialog({'show':true,'page':<SendGroup accident={accident}/>,'title':'Select a group you want to send',actions:{on:false,path:'',id:''}})
        this.setState({
            sending:true,
            sendingId:accident.id
        })
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
                                                    this.findPrioirtyAccidents(this.state.accidents,1).length>0
                                                    ?
                                                        (
                                                            <Grid container spacing={2}>
                                                                 <Grid item md={12} xs={12} sm={12}>
                                                                 <Chip
                                                                    style={{marginBottom:15}}
                                                                    size="small"
                                                                    label="Priority number 1 accidents"
                                                                    color="secondary"
                                                                    />
                                                                 </Grid>
                                                                {
                                                                    this.findPrioirtyAccidents(this.state.accidents,1).map(accident=>{
                                                                        if (accident.group.length<=0) {
                                                                            return <Grid item md={4} xs={12} sm={12}>
                                                                            <Card>
                                                                                <CardHeader
                                                                                     title={accident.specific_name}
                                                                                     subheader={accident.fault_type.name}
                                                                                     avatar={<Avatar>{accident.specific_name.charAt(0).toUpperCase()}</Avatar>}
                                                                                     action={
                                                                                         <Button
                                                                                          onClick={()=>this.sendGroup(accident)}
                                                                                          disabled={this.state.sendingId==accident.id}
                                                                                          color={'primary'}
                                                                                          size={'small'}
                                                                                          variant={'contained'}
                                                                                          style={{textTransform:'none'}}
                                                                                         >
                                                                                             {
                                                                                                 this.state.sending&&this.state.sendingId===accident.id
                                                                                                 ?
                                                                                                    (
                                                                                                        <span>Sending.....</span>
                                                                                                    )
                                                                                                 :
                                                                                                    (
                                                                                                        <span>Send group</span>
                                                                                                    )
                                                                                             }
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
                                                                        }
                                                                    })
                                                                }
                                                            </Grid>
                                                        )
                                                    :
                                                        (
                                                            <Typography>No highest priority accident until now ):</Typography>
                                                        )
                                                }
                                                <Divider style={{marginTop:15}}/>
                                               {
                                                   this.findPrioirtyAccidents(this.state.accidents,2).length>0
                                                   ?
                                                        (
                                                            <Grid container spacing={2}>
                                                                <Grid item md={12} xs={12} sm={12}>
                                                                <Chip
                                                                    style={{marginBottom:15}}
                                                                    size="small"
                                                                    label="Priority number 2 accidents"
                                                                    color="secondary"
                                                                    />
                                                                </Grid>
                                                                {
                                                                    this.findPrioirtyAccidents(this.state.accidents,2)
                                                                    .map(accident=>{
                                                                        if (accident.group.length<=0) {
                                                                            return <Grid item md={4} xs={12} sm={12}>
                                                                            <Card>
                                                                                <CardHeader
                                                                                     title={accident.specific_name}
                                                                                     subheader={accident.fault_type.name}
                                                                                     avatar={<Avatar>{accident.specific_name.charAt(0).toUpperCase()}</Avatar>}
                                                                                     action={
                                                                                         <Button
                                                                                          onClick={()=>this.sendGroup(accident)}
                                                                                          disabled={this.state.sendingId==accident.id}
                                                                                          color={'primary'}
                                                                                          size={'small'}
                                                                                          variant={'contained'}
                                                                                          style={{textTransform:'none'}}
                                                                                         >
                                                                                             {
                                                                                                 this.state.sending&&this.state.sendingId===accident.id
                                                                                                 ?
                                                                                                    (
                                                                                                        <span>Sending.....</span>
                                                                                                    )
                                                                                                 :
                                                                                                    (
                                                                                                        <span>Send group</span>
                                                                                                    )
                                                                                             }
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
                                                                        }
                                                                    })
                                                                }
                                                            </Grid>
                                                        )
                                                   :
                                                       (null)
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

export default connect(mapStateToProps,{me,fetchFaultTypes,showMainDialog})(DistricMangerHome)