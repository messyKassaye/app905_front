import React, {Suspense} from "react";
import {getRole} from "../TokenService";
import Loading from "../helpers/Loading";
import {BrowserRouter as Router} from "react-router-dom";
import MainDialog from '../authentication/commons/MainDialog'
let Component = null
class Authenticated extends React.Component{

    constructor(props){
        super(props);
    }


    render() {
        const roleId = JSON.parse(getRole()).id
        if(roleId===2){
            Component = React.lazy(()=> import("./districtManager/DistrictManagerRoute"))
        }else if(roleId===3){
            Component = React.lazy(()=> import("./technician/TechniciansRoutes"))
        }else  if(roleId===1){
            Component = React.lazy(()=>import("./admin/AdminRoutes"))
        }
        return (
            <Suspense fallback={<Loading/>}>
                <MainDialog/>
                <Router>
                    <Component/>
                </Router>
            </Suspense>
        )
    }
}

export default Authenticated
