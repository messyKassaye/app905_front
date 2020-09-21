import React from 'react'
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import SuperAdminHome from './components/SuperAdminHome'
class SuperAdminNestedRoute extends React.Component{
    render(){

        return <Switch>
                <Route path='/auth' component={SuperAdminHome} exact/>
        </Switch>
    }
}

export default SuperAdminNestedRoute