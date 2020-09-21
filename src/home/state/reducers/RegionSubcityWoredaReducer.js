import {FETCH_REGION_SUBCITY_ZONE_WOREDA} from '../actionConstants/HomeConstants'

const initialState = {
    regions:[],
    loading:true,
}

export default function(state=initialState,action){
    switch(action.type){
        case FETCH_REGION_SUBCITY_ZONE_WOREDA:
            return {
                ...state,
                regions:action.payload,
                loading:false
            }

            default:
                return state
    }
}