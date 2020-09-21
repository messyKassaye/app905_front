import React from 'react'
import {FETCH_ACCIDENT_TYPES} from '../actionConstants/HomeConstants'
import axios from 'axios'
import { API_URL } from '../../../constants/constants'

const PATH = 'accident_types'

export const fetchAccidentTypes = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:FETCH_ACCIDENT_TYPES,
        payload:res.data
    }))
}

