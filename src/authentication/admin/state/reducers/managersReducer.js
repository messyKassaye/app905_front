import {STORE_MANAGER,SHOW_NOT_ASSIGNED_MANAGERS,UPDATE_MANAGER, FETCH_MANAGERS} from '../actionConstants/adminConstants'

const initialState = {
    response:{
        status:false,
        message:''
    },
    loading:true,
    managersNotAssignedDistrict:[],
    managers:[],
    managersLoading:true
}

export default function(state=initialState,action){
    switch(action.type){

        case FETCH_MANAGERS:
            return {
                ...state,
                managers:action.payload,
                managersLoading:false
            }
        case STORE_MANAGER:
            return {
                ...state,
                response:action.payload
            }
            case SHOW_NOT_ASSIGNED_MANAGERS:
                return {
                    ...state,
                    loading:false,
                    managersNotAssignedDistrict:action.payload
                }

            case UPDATE_MANAGER:
                return {
                    ...state,
                    response:action.payload
                }
            default:
                return state
    }
}