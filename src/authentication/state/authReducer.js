import {combineReducers} from "redux";
import AdminReducers from '../admin/state/AdminReducers'
import districtManageReducer from "../districtManager/state/districtManageReducer";
import faultsReducer from './reducers/faultsReducer'
export default combineReducers({
  adminReducer:AdminReducers,
  commonFaultReducer:faultsReducer,
  districtManagersReducer:districtManageReducer
})
