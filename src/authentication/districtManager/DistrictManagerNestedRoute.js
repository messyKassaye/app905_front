import React from 'react'
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import DistricMangerHome from './component/DistrictMangerHome';
class DistrictManagerNestedRoute extends React.Component{

    render(){
        return <Switch>
        <Route path='/auth' component={DistricMangerHome} exact/>
</Switch>
    }
}

export default DistrictManagerNestedRoute