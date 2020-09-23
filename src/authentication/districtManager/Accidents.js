import { Card, CardContent, CardHeader, Container } from '@material-ui/core'
import React from 'react'
import WarningIcon from '@material-ui/icons/Warning'
class Accidents extends React.Component{
    render(){
        return (
            <Container maxWidth={'lg'}>
                <Card>
                    <CardHeader
                     title={'Accidents'}
                     avatar={<WarningIcon/>}
                     style={{backgroundColor:'#3C4252',color:'white'}}
                    />
                    <CardContent>

                    </CardContent>

                </Card>
            </Container>
        )
    }
}

export default Accidents