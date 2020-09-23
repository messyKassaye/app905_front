import {FETCH_FAULT_TYPES} from '../managerConstants/managerConstants'

const initialState = {
    faultTypeLoading:true,
    faultTypes:[]
}

export default function(state=initialState,action){
    switch(action.type){
        case FETCH_FAULT_TYPES:
            return {
                ...state,
                faultTypeLoading:false,
                faultTypes:action.payload
            }

            default:
                return state
    }
}