import React from 'react'
import {FETCH_FAULTS} from '../authConstants/authConstants'
import axios from 'axios'
import { API_URL } from '../../../constants/constants'
const PATH = 'faults'
export const fetchCommonFaults = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:FETCH_FAULTS,
        payload:res.data
    }))
}