import {FETCH_GROUPS, STORE_GROUPS,SHOW_GROUPS} from '../managerConstants/managerConstants'

const initialState = {
    response:{
        status:false,
        message:''
    },
    loading:true,
    groups:[],
    showLoading:true,
    showGroup:[]
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