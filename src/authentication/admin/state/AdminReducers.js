import {combineReducers} from "redux";
import FaultTypeReducer from './reducers/FaultTypeReducer'
import dialogReducer from './reducers/dialogReducer'
import managersReducer from "./reducers/managersReducer";
import districtReducer from "./reducers/districtReducer";
import regionWoredaCityReducer from "./reducers/regionWoredaCityReducer";
import districtAreaReducer from "./reducers/districtAreaReducer";
export default combineReducers({
   faultTypeReducers:FaultTypeReducer,
   dialogReducers:dialogReducer,
   managerReducers:managersReducer,
   districtReducers:districtReducer,
   regionWoredaCityReducer:regionWoredaCityReducer,
   districtsAreaReducer:districtAreaReducer
})