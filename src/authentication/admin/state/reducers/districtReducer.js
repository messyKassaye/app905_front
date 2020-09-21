import {ADD_NEW_DISTRICT,FETCH_DISTRICT, 
    SHOW_DISTRICT,UPDATE_DISTRICT} from '../actionConstants/adminConstants'

const initialState = {
    response:{
        status:false,
        message:''
    },
    loading:true,
    districts:[],
    showDistricts:[],
    showLoading:true,
    updateResponse:{
        status:false,
        message:''
    }
}

export default function(state=initialState,action){
    switch(action.type){
        case ADD_NEW_DISTRICT:
            return {
                ...state,
                response:action.payload
            }

            case FETCH_DISTRICT:
                return {
                    ...state,
                    districts:action.payload,
                    loading:false
                }
                case SHOW_DISTRICT:
                    return {
                        ...state,
                        showDistricts:action.payload,
                        showLoading:false
                    }
                    case UPDATE_DISTRICT:
                        return {
                            ...state,
                            updateResponse:action.payload
                        }


            default:
                return state
    }
}