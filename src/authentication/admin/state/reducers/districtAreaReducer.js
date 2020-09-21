import React from 'react'
import { STORE_AREA } from '../actionConstants/adminConstants'

const initialState = {
    response:{
        status:false,
        message:''
    }
}

export default function(state=initialState,action){
    switch(action.type){
        case STORE_AREA:
            return{
                ...state,
                response:action.payload
            }
            default:
                return state
    }
}