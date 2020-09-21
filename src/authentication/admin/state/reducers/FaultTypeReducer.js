import {FETCHFAULTTYPE,STOREFAULTTPE} from '../actionConstants/adminConstants'

const initialState = {
    loading:true,
    faultTypes:[],
    response:{
        status:false,
        message:''
    }
}

export default function(state=initialState,action){
    switch(action.type){
        case FETCHFAULTTYPE:
            return {
                ...state,
                loading:false,
                faultTypes:action.payload
            }

            case STOREFAULTTPE:
                return{
                    ...state,
                    response:action.payload
                }

            default:
                return state
    }
}