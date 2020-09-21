import React from 'react'
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import AdminHome from '../admin/components/AdminHome'
import Districts from './components/Districts'
import Faults from './components/Faults';
class AdminNestedRoute extends React.Component{

    render(){

       return <Switch>
                <Route path='/auth' component={AdminHome} exact/>
                <Route path={'/auth/admin/districts'} component={Districts}/>
                <Route path={'/auth/admin/accidents'} component={Faults}/>
        </Switch>
    }
}

export default AdminNestedRoute;