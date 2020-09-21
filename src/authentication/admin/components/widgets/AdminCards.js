import React from 'react'
import {Container, Grid} from "@material-ui/core";
import {deepOrange, deepPurple, green, grey} from "@material-ui/core/colors";
import CommonDashboardCard from "../../../commons/CommonDashboardCard";
import Skeleton from "@material-ui/lab/Skeleton";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add'
class AdminCards extends React.Component{

    render(){

        return (
           <Container maxWidth={'lg'} style={{marginBottom:25}}>
               <Grid container spacing={2}>
                                <Grid item md={3} xs={12} sm={12}>
                                    <CommonDashboardCard
                                        chartBackgroundColor={deepOrange[500]}
                                        cardBackgroundColor={green[500]}
                                        action={<IconButton onClick={this.addNewAdvert} color={"inherit"}><AddIcon/></IconButton>}
                                        textColor={'white'}
                                        title={9}
                                        subheader={'District managers'}
                                    />
                                </Grid>

                                <Grid item md={3} xs={12} sm={12}>
                                    <CommonDashboardCard
                                        chartBackgroundColor={green[500]}
                                        cardBackgroundColor={'#3C4252'}
                                        action={<IconButton onClick={this.newCompany} color={"inherit"}><AddIcon/></IconButton>}
                                        textColor={'white'}
                                        title={10}
                                        subheader={'Total accidents'}
                                    />
                                </Grid>

                                <Grid item md={3} xs={12} sm={12}>
                                    <CommonDashboardCard
                                        chartBackgroundColor={green[500]}
                                        cardBackgroundColor={deepPurple[600]}
                                        textColor={'white'}
                                        title={12}
                                        subheader={'Total groups'}
                                    />
                                </Grid>

                                <Grid item md={3} xs={12} sm={12}>
                                    <CommonDashboardCard
                                        chartBackgroundColor={green[500]}
                                        cardBackgroundColor={deepOrange[600]}
                                        textColor={'white'}
                                        title={12}
                                        subheader={'Total groups'}
                                    />
                                </Grid>

              </Grid>
           
           </Container>
        )
    }
}

export default AdminCards