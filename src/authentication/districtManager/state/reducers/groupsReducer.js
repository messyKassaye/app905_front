import {FETCH_GROUPS, STORE_GROUPS,SHOW_GROUPS,UPDATE_GROUP} from '../managerConstants/managerConstants'

const initialState = {
    response:{
        status:false,
        message:''
    },
    loading:true,
    groups:[],
    showLoading:true,
    showGroup:[],
    updateResponse:{
        status:false,
        message:''
    }
}

export default function(state=initialState,action){
    switch(action.type){
        case STORE_GROUPS:
            return {
                ...state,
                response:action.payload
            }
            case FETCH_GROUPS:
                return {
                    ...state,
                    loading:false,
                    groups:action.payload
                }
                case UPDATE_GROUP:
                    return {
                        ...state,
                        updateResponse:action.payload
                    }
                case SHOW_GROUPS:
                    return {
                        ...state,
                        showLoading:false,
                        showGroup:action.payload
                    }
            default:
                return state
    }
}