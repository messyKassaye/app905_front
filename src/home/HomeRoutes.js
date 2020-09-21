import React from 'react'
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import HomePage from './HomePage';
import Login from './Login';
import LoginPage from './LoginPage';

class HomeRoutes extends React.Component{
    render(){

       return <Router>
            <Switch>
                <Route path='/' component={HomePage} exact/>
                <Route path='/login' component={LoginPage} />
            </Switch>
        </Router>
    }
}

export default HomeRoutes