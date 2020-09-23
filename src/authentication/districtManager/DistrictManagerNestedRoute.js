import React from 'react'
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import Accidents from './Accidents';
import DistricMangerHome from './component/DistrictMangerHome';
import Technicians from './Technicians';
import Groups from './Groups';

class DistrictManagerNestedRoute extends React.Component{

    render(){
        return <Switch>
        <Route path='/auth' component={DistricMangerHome} exact/>
        <Route path='/auth/districtManager/groups' component={Groups}/>
        <Route path='/auth/districtManager/accidents' component={Accidents}/>
        <Route path='/auth/districtManager/technicians' component={Technicians}/>
</Switch>
    }
}

export default DistrictManagerNestedRoute