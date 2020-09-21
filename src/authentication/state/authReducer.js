import {combineReducers} from "redux";
import AdminReducers from '../admin/state/AdminReducers'

export default combineReducers({
  adminReducer:AdminReducers 
})
