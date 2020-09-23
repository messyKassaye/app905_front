import {combineReducers} from "redux";
import faultTypeReducer from "./reducers/faultTypeReducer";
import groupsReducer from "./reducers/groupsReducer";


export default combineReducers({
    managerFaultTypes:faultTypeReducer,
    groupsReducer:groupsReducer
})