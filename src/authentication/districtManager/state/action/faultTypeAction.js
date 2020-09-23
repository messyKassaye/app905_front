import React from 'react'
import axios from 'axios'
import { API_URL } from '../../../../constants/constants'
import {FETCH_FAULT_TYPES} from '../managerConstants/managerConstants'
const PATH = 'fault_types'

export const fetchFaultTypes = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:FETCH_FAULT_TYPES,
        payload:res.data
    }))
}