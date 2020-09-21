import { Card, Container,CardHeader,CardContent, IconButton } from '@material-ui/core'
import React from 'react'
import {showMainDialog} from '../state/actions/dialogAction'
import AddIcon from '@material-ui/icons/Add';
import WarningIcon from '@material-ui/icons/Warning'
import {connect} from 'react-redux'
import FaultRegistration from './FaultRegistration';
class Faults extends React.Component{

    
    render(){
        return (
            <Container maxWidth={'lg'}>
                <Card>
                    <CardHeader
                        title={'Accidents'}
                        avatar={<WarningIcon/>}
                    />
                    <CardContent>

                    </CardContent>
                </Card>
            </Container>
        )
    }
}



export default connect(null,{showMainDialog})(Faults)