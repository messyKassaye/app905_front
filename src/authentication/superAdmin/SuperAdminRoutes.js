import React from  'react'
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import SuperAdminDashboard from './SuperAdminDashboard'
class  SuperAdminRoutes extends React.Component{
   
    render() {
        return  (
            <Router>
                <Switch>
                    <Route  path='/auth' component={SuperAdminDashboard}/>
                </Switch>
            </Router>
        )
    }


}

export default SuperAdminRoutes