import React from "react";
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import DistrictManagerDashboard from "./DistrictManagerDashboard";
const DistrictManagerRoute = ()=>{
    return (
        <Router>
            <Switch>
                <Route path='/auth' component={DistrictManagerDashboard}/>
            </Switch>
        </Router>
    )
}
export default DistrictManagerRoute