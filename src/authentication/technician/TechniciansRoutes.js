import React from "react";
import {BrowserRouter as Router,Route,Switch,Redirect,withRouter} from "react-router-dom";
import TechniciansDashboard from "./TechniciansDashboard";

class  TechniciasRoutes extends React.Component{
    constructor(props) {
        super(props);

    }



    render() {
        return  (
            <Router>
                <Switch>
                    <Route  path='/auth' component={TechniciansDashboard}/>
                </Switch>
            </Router>
        )
    }


}

export default withRouter(TechniciasRoutes)
