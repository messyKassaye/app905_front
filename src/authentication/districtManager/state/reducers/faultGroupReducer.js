import {ASSIGN_FAULT_TO_GROUP} from '../managerConstants/managerConstants'

const initialState={
    response:{
        status:false,
        message:''
    }
}

export default function(state=initialState,action){
    switch(action.type){
        case ASSIGN_FAULT_TO_GROUP:
            return {
                ...state,
                response:action.payload
            }

            default:
                return state
    }
}
