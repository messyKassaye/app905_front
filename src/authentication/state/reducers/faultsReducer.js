import {FETCH_FAULTS} from '../authConstants/authConstants'

const initialState = {
    loading:true,
    faults:[]
}

export default function(state=initialState,action){
    switch(action.type){
        case FETCH_FAULTS:
            return{
                ...state,
                loading:false,
                faults:action.payload
            }

            default:
                return state;
    }
}