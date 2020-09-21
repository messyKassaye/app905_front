import React from 'react'
import {FETCH_REGION_WOREDA} from '../actionConstants/adminConstants'
const initialState = {
    loading:true,
    regionWoredaCities:[]
}

export default function(state=initialState,action){
    switch(action.type){
        case FETCH_REGION_WOREDA:
            return {
                ...state,
                loading:false,
                regionWoredaCities:action.payload
            }

            default:
                return state
    }
}