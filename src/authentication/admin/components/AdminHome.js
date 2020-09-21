import React from 'react'
import {fetchFaultTypes} from '../state/actions/FaultTypeAction'
import {connect} from 'react-redux'
import  Skeleton from '@material-ui/lab/Skeleton'
import FaultRegistration from './FaultRegistration'
import Districts from './Districts'
import Faults from './Faults'
import AdminCards from './widgets/AdminCards'
import DistrictCard from './widgets/DistrictCard'
import FaultCards from './widgets/FaultCards'
import ManagersCard from './widgets/ManagersCard'
class AdminHome extends React.Component{

    componentDidMount = ()=>{
        this.props.fetchFaultTypes()
    }

    render(){

        return(
            <div>
                {
                    this.props.loading
                    ?
                        (
                            <Skeleton variant={'rect'} width={'100%'} height={300}/>
                        )
                    :
                        (
                            <div>
                                {
                                    this.props.faultTypes.length<=0
                                    ?
                                        (
                                            <FaultRegistration/>
                                        )
                                    :
                                        (
                                            <div style={{display:'flex',flexDirection:'column'}}>
                                                <AdminCards/>
                                                <DistrictCard/>
                                                <FaultCards/>
                                                <ManagersCard/>
                                            </div>
                                        )
                                }
                            </div>
                        )
                
                }
            </div>
        )
    }
}

const mapStateToProps = state=>({
    faultTypes:state.authReducer.adminReducer.faultTypeReducers.faultTypes,
    loading:state.authReducer.adminReducer.faultTypeReducers.loading
})
export default connect(mapStateToProps,{fetchFaultTypes})(AdminHome)