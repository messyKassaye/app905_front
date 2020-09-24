import {combineReducers} from "redux";
import faultGroupReducer from "./reducers/faultGroupReducer";
import faultTypeReducer from "./reducers/faultTypeReducer";
import groupAssignReducer from "./reducers/groupAssignReducer";
import groupsReducer from "./reducers/groupsReducer";


export default combineReducers({
    managerFaultTypes:faultTypeReducer,
    groupsReducer:groupsReducer,
    groupUserAssignReducer:groupAssignReducer,
    faultGroupReducer:faultGroupReducer
})