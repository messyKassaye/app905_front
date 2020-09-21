import {combineReducers} from "redux";
import AccidentTypesReducer from "./reducers/AccidentTypesReducer";
import AccidentsRducer from './reducers/AccidentsReducer'
import RegionSubcityWoredaReducer from './reducers/RegionSubcityWoredaReducer'
export default combineReducers({
    accidentTypeReducer:AccidentTypesReducer,
    accidentsReducer:AccidentsRducer,
    regionSubcityWoredaReducer:RegionSubcityWoredaReducer
})