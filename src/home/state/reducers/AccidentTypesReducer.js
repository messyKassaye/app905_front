import { init } from 'i18next'
import React from 'react'
import {FETCH_ACCIDENT_TYPES} from '../actionConstants/HomeConstants'

const initialState = {
    accidentTypes:[],
    loading:true
}

export default function(state=initialState,action){
    switch(action.type){
        case FETCH_ACCIDENT_TYPES:
            return {
                ...state,
                accidentTypes:action.payload,
                loading:false
            }

            default:
                return state
    }
}