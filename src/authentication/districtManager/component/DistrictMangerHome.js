import { Card, CardContent, CardHeader, Container } from '@material-ui/core'
import React from 'react'
import Pusher from 'pusher-js'
class DistricMangerHome extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            accidents:[]
        }
    }
    componentDidMount(){
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
    render(){
        return <Container maxWidth={'lg'}>
                <Card>
                    <CardContent>
                       {
                           this.state.accidents.map(accident=>(
                               <Card key={accident.id}>
                                   <CardHeader
                                     title={accident.specific_name}
                                    />
                               </Card>
                           ))
                       }
                    </CardContent>
                </Card>
        </Container>
    }
}

export default DistricMangerHome