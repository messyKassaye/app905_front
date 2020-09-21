import {combineReducers} from "redux";
import usersReducer from '../src/authentication/state/reducers/usersReducer'
import authReducer from '../src/authentication/state/authReducer'
import HomeReducer from "./home/state/HomeReducer";
export default combineReducers({
    userData: usersReducer,
    authReducer:authReducer,
    homeReducer:HomeReducer
})