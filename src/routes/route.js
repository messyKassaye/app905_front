import React from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import PrivateRoutes from "./PrivateRoute";
import Authenticated from "../authentication/Authenticated";
import AuthenticatedRoute from "./AuthenticationRoute";
import HomePage from '../home/HomePage'
import HomeRoutes from "../home/HomeRoutes";
class Routes extends React.Component{

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Router>
                <Switch>
                    <AuthenticatedRoute path={'/auth'} component={Authenticated}/>
                    <PrivateRoutes path='/' component={HomeRoutes}/>
                </Switch>
            </Router>
        );
    }


}

export default Routes
