import {SEND_ACCIDENTS} from '../actionConstants/HomeConstants'

const initialState = {
    response:{
        status:false,
        message:''
    }
}

export default function(state=initialState,action){
    switch(action.type){
        case SEND_ACCIDENTS:
            return{
                ...state,
                response:action.payload
            }

            default:
                return state
    }
}