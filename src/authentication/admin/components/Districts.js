import { Card, CardContent, CardHeader, Container, IconButton } from '@material-ui/core'
import React from 'react'
import PlaceIcon from '@material-ui/icons/Place';
import AddIcon from '@material-ui/icons/Add'

class Districts extends React.Component{

    render(){
        return(
            <Container maxWidth={'lg'} style={{marginBottom:20}}>
                <Card>
                    <CardHeader
                        title={'Districts'}
                        avatar={<PlaceIcon/>}
                        action={<IconButton color={'inherit'}><AddIcon/></IconButton>}
                    />
                    <CardContent>

                    </CardContent>
                </Card>
            </Container>
        )
    }
}

export default Districts